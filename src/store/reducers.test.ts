import dataReducer, {
  addEntry,
  deleteEntry,
  editEntry,
  initialState,
  setCurrentPage,
} from "store/slices/data";
import { mockedCurrenPage } from "./render_with_Redux";

describe("REDUCERS", () => {
  test("1. setCurrentPage", () => {
    // Lets add 1 TODO, expecting [] length to be 1

    const result = dataReducer(
      initialState,
      setCurrentPage({
        type: "todos",
        data: [
          {
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: false,
          },
        ],
      })
    ).currentPage.data;

    expect(result.length).toBe(1);
  });

  test("2. deleteEntry", () => {
    // Lets delete one TODO (with ID = 1), expecting [] length to be 3 (initialy we have 4 TODOs)
    const result = dataReducer(mockedCurrenPage, deleteEntry(1)).currentPage.data;
    expect(result.length).toBe(3);

    // Lets check that we dont have TODO with ID=1 in our state
    expect(result.find((item) => item.id === 1)).toBeFalsy();
  });

  test("3. addEntry", () => {
    // Lets add 1 TODO, expecting [] length to be 5 (initialy we have 4 TODOs)

    const result = dataReducer(
      mockedCurrenPage,
      addEntry({
        type: "todos",
        data: {
          userId: 1,
          id: 1,
          title: "delectus aut autem",
          completed: false,
        },
      })
    ).currentPage.data;

    expect(result.length).toBe(5);
  });

  test("4. editEntry", () => {
    // Lets edit TODO with ID=1, expecting userId = 777

    const result = dataReducer(
      mockedCurrenPage,
      editEntry({
        data: {
          userId: 777,
          id: 1,
          title: "delectus aut autem",
          completed: false,
        },
      })
    ).currentPage.data;

    expect(result[0].userId).toBe(777);
  });
});
