import Dashboard from ".";
import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "store/store";
import { ThemeMode } from "theme/ThemeMode";
import userEvent from "@testing-library/user-event";

// -------Mocks----------------------------------------------------------------------------------------------

// Lets mock AXIOS
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Lets mock API response
// Different responses for first/ second page requested
// Headers data for pagination

mockedAxios.get.mockImplementation((url, options) => {
  if (url === "todos/" && options?.params?._page === 2)
    return Promise.resolve({ headers: { "x-total-count": 500 }, data: todos_page_2 });

  return Promise.resolve({ headers: { "x-total-count": 500 }, data: todos_page_1 });
});

// Responses for the AXIOS:
const todos_page_1 = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
];

const todos_page_2 = [
  {
    userId: 1,
    id: 7,
    title: "todo on second page",
    completed: false,
  },
];

// -------Tests----------------------------------------------------------------------------------------------

// Clearing mocks after each test !!!!!
afterEach(() => {
  jest.clearAllMocks();
});

describe("AXIOS plus Pagination", () => {
  test("1. First page data + paginations params", async () => {
    const { container } = await act(async () =>
      render(
        <ThemeMode>
          <MemoryRouter initialEntries={["/dashboard/todos"]}>
            <Provider store={store}>
              <Dashboard />
            </Provider>
          </MemoryRouter>
        </ThemeMode>
      )
    );

    // Lets check pagination info obtained from API -- total entries must be 500
    expect(container).toHaveTextContent("500");

    // FIRST PAGE
    // Lets check that TODOs from first page present on the page
    // Must be 4 table rows = 3 TODOS + 1 table heading
    const tableRows = container.querySelectorAll("tr");
    expect(tableRows.length).toBe(4);
  });

  test("2. Second page data + paginations params", async () => {
    const { container } = await act(async () =>
      render(
        <ThemeMode>
          <MemoryRouter initialEntries={["/dashboard/todos"]}>
            <Provider store={store}>
              <Dashboard />
            </Provider>
          </MemoryRouter>
        </ThemeMode>
      )
    );

    // SECOND PAGE
    // Lets select button for next page selection
    const nextPageBtn = container.querySelector(`button[title="Next page"]`);

    // Lets click the button
    nextPageBtn && (await userEvent.click(nextPageBtn));

    // Lets check if api-request called with the proper arguments (last call of the mocked function)

    const pageRequestParams = { params: { _limit: 10, _page: 2 } };

    expect(mockedAxios.get.mock.calls[mockedAxios.get.mock.calls.length - 1][0]).toBe("todos/");
    expect(mockedAxios.get.mock.calls[mockedAxios.get.mock.calls.length - 1][1]).toEqual(pageRequestParams);

    // Lets check if the second TODOs page loaded correctly
    expect(container).toHaveTextContent(/todo on second page/i);
  });

  test("3. Rows-per-page SELECT and request params", async () => {
    const { container } = await act(async () =>
      render(
        <ThemeMode>
          <MemoryRouter initialEntries={["/dashboard/todos"]}>
            <Provider store={store}>
              <Dashboard />
            </Provider>
          </MemoryRouter>
        </ThemeMode>
      )
    );

    // Lets find necessary select on the page
    const rowsSelect = container.querySelector("select");

    // Lets change selected value in Select
    rowsSelect && (await userEvent.selectOptions(rowsSelect, "15"));

    // Lets check selected value in Select -> must be 15

    expect((screen.getByRole("option", { name: "15" }) as HTMLOptionElement).selected).toBe(true);

    // Old selected value must be false
    expect((container.querySelector(`option[value="10"]`)! as HTMLOptionElement).selected).toBe(false);

    // Lets check if api-request called with the proper arguments (last call of the mocked function)

    const pageRequestParams = { params: { _limit: 15, _page: 1 } };

    expect(mockedAxios.get.mock.calls[mockedAxios.get.mock.calls.length - 1][0]).toBe("todos/");
    expect(mockedAxios.get.mock.calls[mockedAxios.get.mock.calls.length - 1][1]).toEqual(pageRequestParams);
  });
});
