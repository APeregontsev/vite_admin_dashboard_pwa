import Auth from ".";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeMode } from "theme/ThemeMode";
/* import { expect, jest, test } from "@jest/globals"; */
import userEvent from "@testing-library/user-event";
import { User } from "firebase/auth";
import { INVALID_EMAIL_TEXT, INVALID_LENGTH_6_TEXT, INVALID_REQUIRED_TEXT } from "./config";
import { useAuth } from "context/AuthContext";
import { useCurrentPath } from "hooks/useCurrentPath";

// -------Mocks----------------------------------------------------------------------------------------------

// Mock FIREBASE

jest.mock("./../../firebase/firebase", () => {
  const originalModule = jest.requireActual("./../../firebase/firebase");

  // Mocked firebase methods
  // General logic is:
  // 1st call of method - return resolved promise
  // 2nd call of method - return rejected promise

  return {
    __esModule: true,
    ...originalModule,
    logIn: jest
      .fn()
      .mockResolvedValue("default")
      .mockResolvedValueOnce({ code: true })
      .mockRejectedValueOnce({ code: "auth/wrong-password" }),

    resetPassword: jest
      .fn()
      .mockResolvedValue("default")
      .mockResolvedValueOnce({ password: true })
      .mockRejectedValueOnce({ code: "You need log-in first!" }),
  };
});

// Mocked useAuth
jest.mock("context/AuthContext");
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mocked useCurrentPath
jest.mock("hooks/useCurrentPath");
const mockUseCurrentPath = useCurrentPath as jest.MockedFunction<typeof useCurrentPath>;

// Mocked Redirect: Navigate and useNavigate
// Func for useNavigate
const navigate = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    Navigate: jest.fn(({ to }) => `Redirected to ${to}`),
    useNavigate: () => navigate,
  };
});

// Mocked useNotify
/* jest.mock("../../hooks/useNotify");
const mockUseNotify = useNotify as jest.MockedFunction<typeof useNotify>; */

const mockUseNotify = jest.fn();

jest.mock("hooks/useNotify", () => {
  return { useNotify: () => mockUseNotify };
});

// -------Tests----------------------------------------------------------------------------------------------

// Clearing mocks after each test !!!!!
afterEach(() => {
  jest.clearAllMocks();
});

describe("AUTH", () => {
  test("0. Redirect if no such page found in Auth", () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "xxxx" });

    // Return useAuth
    mockUseAuth.mockReturnValue({ currentUser: null, logout: () => {}, setUser: () => {} });

    render(
      <ThemeMode>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </ThemeMode>
    );

    screen.debug();
    // Expecting redirect to /auth/login
    expect(screen.getByText(/\/auth\/login/i)).toBeInTheDocument();
  });

  test("1. Signup page loaded", () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "signup" });
    mockUseAuth.mockReturnValue({ currentUser: null, logout: () => {}, setUser: () => {} });

    const { container } = render(
      <ThemeMode>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </ThemeMode>
    );

    // Lets check number of inputs
    const inputs = container.getElementsByTagName("input");
    expect(inputs).toHaveLength(5);

    // Lets check Title
    expect(container).toHaveTextContent(/Register/i);

    // Lets check exact inputs to be present on the page
    expect(screen.getByRole("textbox", { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /First name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Last name/i })).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(screen.getByLabelText("confirm password")).toBeInTheDocument();
  });

  test("2. Login page loaded", () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "login" });
    mockUseAuth.mockReturnValue({ currentUser: null, logout: () => {}, setUser: () => {} });

    const { container } = render(
      <ThemeMode>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </ThemeMode>
    );

    // Lets check number of inputs
    const inputs = container.getElementsByTagName("input");
    expect(inputs).toHaveLength(2);

    // Lets check Title
    expect(container).toHaveTextContent(/Log in/i);

    // Lets check exact inputs to be present on the page
    expect(screen.getByRole("textbox", { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
  });

  test("3. Forgotpassword page loaded", () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "forgotpassword" });
    mockUseAuth.mockReturnValue({ currentUser: null, logout: () => {}, setUser: () => {} });

    const { container } = render(
      <ThemeMode>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </ThemeMode>
    );

    // Lets check number of inputs
    const inputs = container.getElementsByTagName("input");
    expect(inputs).toHaveLength(1);

    // Lets check Title
    expect(container).toHaveTextContent(/Forgot/i);

    // Lets check exact inputs to be present on the page
    expect(screen.getByRole("textbox", { name: /Email/i })).toBeInTheDocument();
  });

  test("4. Resetpassword page loaded", () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "resetpassword" });
    mockUseAuth.mockReturnValue({ currentUser: null, logout: () => {}, setUser: () => {} });

    const { container } = render(
      <ThemeMode>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </ThemeMode>
    );

    // Lets check number of inputs
    const inputs = container.getElementsByTagName("input");
    expect(inputs).toHaveLength(2);

    // Lets check Title
    expect(container).toHaveTextContent(/Reset Password/i);

    // Lets check exact inputs to be present on the page
    expect(screen.getByLabelText("new password")).toBeInTheDocument();
    expect(screen.getByLabelText("confirm password")).toBeInTheDocument();
  });

  test("5. Login page: Validation of Inputs", async () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "login" });
    mockUseAuth.mockReturnValue({ currentUser: null, logout: () => {}, setUser: () => {} });

    const { container } = render(
      <ThemeMode>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </ThemeMode>
    );

    // Simulated user inputs
    const emailInput = container.querySelector(`input[name="email"]`);
    const passwordInput = container.querySelector(`input[name="password"]`);
    const submitBTN = container.querySelector(`button[type="submit"]`);

    // Elements containing warning message
    const emailInputWarning = container.querySelector(`input[name="email"] + p`);
    const passwordInputWarning = container.querySelector(`input[name="password"] ~ p`);

    // 1. Lets submit empty values
    await userEvent.click(submitBTN!);

    expect(emailInputWarning).toHaveTextContent(INVALID_REQUIRED_TEXT);
    expect(passwordInputWarning).toHaveTextContent(INVALID_REQUIRED_TEXT);

    // 2. Lets provide wrong email / wrong length
    await userEvent.type(emailInput!, "111");
    await userEvent.type(passwordInput!, "111");

    await userEvent.click(submitBTN!);

    expect(emailInputWarning).toHaveTextContent(INVALID_EMAIL_TEXT);
    expect(passwordInputWarning).toHaveTextContent(INVALID_LENGTH_6_TEXT);
  }, 5000);

  test("6. Login page: Redirect after successful login", async () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "login" });
    mockUseAuth.mockReturnValue({ currentUser: null, logout: () => {}, setUser: () => {} });

    const { container } = render(
      <ThemeMode>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </ThemeMode>
    );

    // Simulated user inputs
    const emailInput = container.querySelector(`input[name="email"]`);
    const passwordInput = container.querySelector(`input[name="password"]`);
    const submitBTN = container.querySelector(`button[type="submit"]`);

    await userEvent.type(emailInput!, "othersidesss@gmail.com2");
    await userEvent.type(passwordInput!, "11111111");

    await userEvent.click(submitBTN!);

    // Correct notification displayed (text and type)
    expect(mockUseNotify.mock.calls[0][0]).toBe("You have successfully logged in!");
    expect(mockUseNotify.mock.calls[0][1]).toBe("success");

    // Correct redirect
    expect(navigate).toHaveBeenCalledWith("/dashboard/overview");
  }, 5000);

  test("7. Login page: Forgot Password link appears (after wrong pass entered)", async () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "login" });
    mockUseAuth.mockReturnValue({ currentUser: null, logout: () => {}, setUser: () => {} });

    const { container } = render(
      <ThemeMode>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </ThemeMode>
    );

    // Simulated user inputs
    const emailInput = container.querySelector(`input[name="email"]`);
    const passwordInput = container.querySelector(`input[name="password"]`);
    const submitBTN = container.querySelector(`button[type="submit"]`);

    await userEvent.type(emailInput!, "othersidesss@gmail.com");
    await userEvent.type(passwordInput!, "11111111");

    await userEvent.click(submitBTN!);

    expect(screen.getByRole("textbox")).toHaveValue("othersidesss@gmail.com");

    // Checking if necessary block displayed
    expect(container).toHaveTextContent(/Forgot password/i);
  }, 5000);

  test("8. Login/Signup/Forgot page: Redirect to Dashboard if already logged-in", () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "signup" });

    // Lets provide truthy value for currentUser
    mockUseAuth.mockReturnValue({ currentUser: {} as User, logout: () => {}, setUser: () => {} });

    render(
      <ThemeMode>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </ThemeMode>
    );

    screen.debug();
    // Expecting redirect to /dashboard
    expect(screen.getByText(/\/dashboard/i)).toBeInTheDocument();
  }, 5000);

  test("9. Resetpassword page: successful password change", async () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "resetpassword" });

    // Lets provide truthy value for currentUser
    mockUseAuth.mockReturnValue({ currentUser: {} as User, logout: () => {}, setUser: () => {} });

    const { container } = render(
      <ThemeMode>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </ThemeMode>
    );

    // Simulated user inputs
    const password_1_Input = container.querySelector(`input[name="password1"]`);
    const password_2_Input = container.querySelector(`input[name="password2"]`);
    const submitBTN = container.querySelector(`button[type="submit"]`);

    await userEvent.type(password_1_Input!, "qazwsxD1");
    await userEvent.type(password_2_Input!, "qazwsxD1");
    await userEvent.click(submitBTN!);

    // Correct notification displayed (text and type)
    expect(mockUseNotify.mock.calls[0][0]).toBe("Your password was successfully changed!");
    expect(mockUseNotify.mock.calls[0][1]).toBe("success");

    // Lets check correct redirect after successful password change
    expect(navigate).toHaveBeenCalledWith("/auth/login");
  }, 5000);

  test("10. Resetpassword page: login needed to proceed", async () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "resetpassword" });

    // Lets provide falsy value for currentUser
    mockUseAuth.mockReturnValue({ currentUser: null, logout: () => {}, setUser: () => {} });

    const { container } = render(
      <ThemeMode>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </ThemeMode>
    );

    // Simulated user inputs
    const password_1_Input = container.querySelector(`input[name="password1"]`);
    const password_2_Input = container.querySelector(`input[name="password2"]`);
    const submitBTN = container.querySelector(`button[type="submit"]`);

    await userEvent.type(password_1_Input!, "qazwsxD1");
    await userEvent.type(password_2_Input!, "qazwsxD1");
    await userEvent.click(submitBTN!);

    // Correct notification displayed (text and type)
    expect(mockUseNotify.mock.calls[0][0]).toBe("You need log-in first!");
    expect(mockUseNotify.mock.calls[0][1]).toEqual(undefined);
  }, 5000);
});
