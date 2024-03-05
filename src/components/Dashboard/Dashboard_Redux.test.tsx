import Dashboard from ".";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useCurrentPath } from "hooks/useCurrentPath";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { store } from "store/store";
import { ThemeMode } from "theme/ThemeMode";
import * as loadingDataHooks from "store/slices/loadDataHooks";
import { reduxInitialState, renderWithRedux } from "store/render_with_Redux";
import userEvent from "@testing-library/user-event";
import { useAuth } from "context/AuthContext";
import { User } from "firebase/auth";

// -------Mocks----------------------------------------------------------------------------------------------

// Mocked useNotify
/* jest.mock("../../hooks/useNotify");
const mockUseNotify = useNotify as jest.MockedFunction<typeof useNotify>; */

const mockUseNotify = jest.fn();

jest.mock("hooks/useNotify", () => {
  return { useNotify: () => mockUseNotify };
});

// Mocked useAuth
jest.mock("context/AuthContext");
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock FIREBASE

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

// Mocked useCurrentPath
jest.mock("hooks/useCurrentPath");
const mockUseCurrentPath = useCurrentPath as jest.MockedFunction<typeof useCurrentPath>;

// -------Tests----------------------------------------------------------------------------------------------

// Clearing mocks after each test !!!!!
afterEach(() => {
  jest.clearAllMocks();
});

// ROOT ID FOR MODAL - via PORTAL ------------------------------------------------------

let root: HTMLDivElement;
beforeEach(() => {
  root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
});

afterEach(() => {
  document.body.removeChild(root);
});

// ROOT ID FOR MODAL ------------------------------------------------------

describe("DASHBOARD", () => {
  test("0. Redirect if no such page found in Dashboard", () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "dashboard12345" });

    render(
      <ThemeMode>
        <MemoryRouter initialEntries={["/dashboard12345"]}>
          <Provider store={store}>
            <Dashboard />
          </Provider>
        </MemoryRouter>
      </ThemeMode>
    );

    // Expecting redirect to /dashboard/overview
    expect(screen.getByText(/\/dashboard\/overview/i)).toBeInTheDocument();
  });

  test("1. Check correct rendering of defined address - settings", () => {
    mockUseCurrentPath.mockReturnValue({ addressPath: "settings" });

    // Lets provide truthy value for currentUser
    mockUseAuth.mockReturnValue({ currentUser: {} as User, logout: () => {}, setUser: () => {} });

    const { container } = render(
      <ThemeMode>
        <MemoryRouter initialEntries={["/dashboard/settings"]}>
          <Provider store={store}>
            <Dashboard />
          </Provider>
        </MemoryRouter>
      </ThemeMode>
    );

    // Lets chech if we Have H1 Heading "Settings"
    const h1 = container.querySelector(`h1`);
    expect(h1).toHaveTextContent(/settings/i);
  });

  test("2. Check correct rendering of TODOS section", () => {
    // Lets mock data for pagination
    jest.spyOn(loadingDataHooks, "useLoadCurrentPage").mockImplementation(() => {
      return { isLoading: false, totalCount: 500, searchedPage: null };
    });

    mockUseCurrentPath.mockReturnValue({ addressPath: "todos" });

    const { container } = renderWithRedux(<Dashboard />, reduxInitialState);

    // Lets check if 500 (entries) is present on the page  -- pagination entries
    expect(container).toHaveTextContent("500");

    // Lets check 5 table rows present on the page: 4 TODOS from the Store + 1 row for table heading

    const tableRows = container.querySelectorAll("tr");
    expect(tableRows.length).toBe(5);
  });

  test("3. Add modal appears in the document", async () => {
    // Lets mock data for pagination
    jest.spyOn(loadingDataHooks, "useLoadCurrentPage").mockImplementation(() => {
      return { isLoading: false, totalCount: 500, searchedPage: null };
    });

    mockUseCurrentPath.mockReturnValue({ addressPath: "todos" });

    render(
      <ThemeMode>
        <BrowserRouter>
          <Provider store={store}>
            <Dashboard />
          </Provider>
        </BrowserRouter>
      </ThemeMode>
    );

    // Lets check Modal not to be present in the document
    const modalWindow = screen.queryByText(/add todos/i);
    expect(modalWindow).not.toBeInTheDocument();

    // Lets select +Add button
    const addButton = screen.getByRole("button", { name: /add/i });

    // Lets press +Add button
    await userEvent.click(addButton);

    // Modal "Add item" must appear in the document
    expect(screen.getByRole("heading", { name: /add todos/i })).toBeInTheDocument();
  });

  test("4. Logout works correctly", async () => {
    // Lets mock data for pagination
    jest.spyOn(loadingDataHooks, "useLoadCurrentPage").mockImplementation(() => {
      return { isLoading: false, totalCount: 500, searchedPage: null };
    });

    // Lets provide truthy value for currentUser
    mockUseAuth.mockReturnValue({ currentUser: {} as User, logout: () => {}, setUser: () => {} });

    mockUseCurrentPath.mockReturnValue({ addressPath: "todos" });

    const { container } = render(
      <ThemeMode>
        <BrowserRouter>
          <Provider store={store}>
            <Dashboard />
          </Provider>
        </BrowserRouter>
      </ThemeMode>
    );

    // Lets select Logout button
    const logoutButton = container.querySelector(`div[title="Logout"]`);

    // Lets press Logout button
    logoutButton && (await userEvent.click(logoutButton));

    // Correct notification displayed (text and type)
    expect(mockUseNotify.mock.calls[0][0]).toBe("You have successfully logged out!");
    expect(mockUseNotify.mock.calls[0][1]).toEqual("success");

    // Correct redirect
    expect(navigate).toHaveBeenCalledWith("/auth/login");
  });

  test("5. Username displayed", async () => {
    // Lets mock data for pagination
    jest.spyOn(loadingDataHooks, "useLoadCurrentPage").mockImplementation(() => {
      return { isLoading: false, totalCount: 500, searchedPage: null };
    });

    // Lets provide userName for currentUser
    mockUseAuth.mockReturnValue({
      currentUser: { displayName: "Alexander Peregontsev" } as User,
      logout: () => {},
      setUser: () => {},
    });

    mockUseCurrentPath.mockReturnValue({ addressPath: "todos" });

    const { container } = render(
      <ThemeMode>
        <BrowserRouter>
          <Provider store={store}>
            <Dashboard />
          </Provider>
        </BrowserRouter>
      </ThemeMode>
    );

    // Lets check username to be present on the page
    expect(container).toHaveTextContent(/alexander peregontsev/i);
  });
});
