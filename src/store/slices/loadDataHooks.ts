import { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "store/store";
import { useFetching } from "hooks/useFetching";
import { initialDataURL, resStatus } from "api/api";
import { addEntry, deleteEntry, editEntry, setCurrentPage, setInitialData } from "./data";
import { useMergeData, useSaveData } from "./localStorage";

// Global axios defaults
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";
axios.defaults.headers.common["Content-type"] = "application/json; charset=UTF-8";

// For loading ALL initial data
export function useLoadData() {
  //
  const dispatch = useAppDispatch();

  // useFetching hook
  const { fetching, isLoading } = useFetching(async () => {
    const todosResponse = axios.get(initialDataURL.todos.url);
    const usersResponse = axios.get(initialDataURL.users.url);
    const photosResponse = axios.get(initialDataURL.photos.url);
    const albumsResponse = axios.get(initialDataURL.albums.url);
    const commentsResponse = axios.get(initialDataURL.comments.url);
    const postsResponse = axios.get(initialDataURL.posts.url);

    const result = await Promise.all([
      todosResponse,
      postsResponse,
      usersResponse,
      commentsResponse,
      photosResponse,
      albumsResponse,
    ]);

    dispatch(
      setInitialData({
        todos: useMergeData("todos", result[0].data),
        posts: useMergeData("posts", result[1].data),
        users: useMergeData("users", result[2].data),
        comments: useMergeData("comments", result[3].data),
        photos: useMergeData("photos", result[4].data),
        albums: useMergeData("albums", result[5].data),
      })
    );
  });

  useEffect(() => {
    fetching();
  }, []);

  return { isLoading };
}

// For loading paged data
export function useLoadCurrentPage(type: string, limit: number, page: number, idParams: string | null) {
  const searchedPage = idParams ? Math.ceil(+idParams / limit) : null;

  // States
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useAppDispatch();

  // useFetching hook
  const { fetching, isLoading } = useFetching(async () => {
    const response = await axios.get(initialDataURL[type].url, {
      params: { _limit: limit, _page: searchedPage ? searchedPage : page },
    });

    // Lets get number of total entries
    const totalCount = response.headers["x-total-count"];
    setTotalCount(totalCount);

    // Lets merge data with data stored in localStorage
    const mergedData = useMergeData(type, response.data, limit);

    // Lets update store
    dispatch(setCurrentPage({ type: type, data: mergedData }));
  });

  useEffect(() => {
    if (searchedPage === page && page != 1) return;
    fetching();
  }, [limit, page, idParams]);

  return { isLoading, totalCount, searchedPage };
}

// For Deleting ENTRY

export function useDeleteEntry(url: string, id: number) {
  const dispatch = useAppDispatch();

  // useFetching hook
  const { fetching, isLoading } = useFetching(async () => {
    let response;

    response = await axios.delete(`${url}${id}`);

    if (resStatus.deleteEntry.includes(response?.status)) {
      dispatch(deleteEntry(id));
      return true;
    }
    return false;
  });

  return {
    isLoading,
    deleteEntry: fetching,
  };
}

// For Adding ENTRY

export function useAddEntry(url: string, type: string) {
  const dispatch = useAppDispatch();

  // useFetching hook
  const { fetching, isLoading } = useFetching(async (data: any) => {
    const response = await axios.post(url, { ...data });

    if (resStatus.addEntry.includes(response?.status)) {
      // Updating localStorage
      useSaveData(type, data);
      // Updating store
      dispatch(addEntry({ type: type, data: data }));
      return true;
    }

    return false;
  });

  return {
    isLoading,
    addEntry: (data: any) => fetching(data),
  };
}

// For Editing ENTRY

export function useEditEntry(url: string, type: string, id?: number) {
  const dispatch = useAppDispatch();

  // useFetching hook
  const { fetching, isLoading } = useFetching(async (data: any) => {
    const response = await axios.put(`${url}${id}`, { ...data });

    if (resStatus.editEntry.includes(response?.status)) {
      // Updating localStorage
      useSaveData(type, data);
      // Updating store
      dispatch(editEntry({ data: data }));
      return true;
    }

    return false;
  });

  return {
    isLoading,
    editEntry: (data: any) => fetching(data),
  };
}
