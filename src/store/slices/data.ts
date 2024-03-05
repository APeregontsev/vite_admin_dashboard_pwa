import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AlbumsType,
  CommentType,
  InitialStateType,
  NotificationType,
  PhotosType,
  PostType,
  TodoType,
  UserType,
} from "./types";

export const initialState: InitialStateType = {
  todos: [],
  posts: [],
  users: [],
  comments: [],
  photos: [],
  albums: [],
  currentPage: { type: "", data: [] },
  notifications: [],
};

type SetInitialData = {
  todos: TodoType[];
  posts: PostType[];
  users: UserType[];
  comments: CommentType[];
  photos: PhotosType[];
  albums: AlbumsType[];
};

export type SetCurrentPage = { type: string; data: any };
export type EditCurrentPage = { data: any };

/* type SetCurrentPage = TodoType[] | PostType[] | UserType[] | CommentType[] | PhotosType[] | AlbumsType[]; */

type AddEntry = {
  type: string;
  data: TodoType | PostType | UserType | CommentType | PhotosType | AlbumsType;
};

type AddNotification = Omit<NotificationType, "id" | "date">;

// Slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setInitialData(state, action: PayloadAction<SetInitialData>) {
      state.todos = action.payload.todos;
      state.posts = action.payload.posts;
      state.users = action.payload.users;
      state.comments = action.payload.comments;
      state.photos = action.payload.photos;
      state.albums = action.payload.albums;
    },

    setCurrentPage(state, action: PayloadAction<SetCurrentPage>) {
      state.currentPage = action.payload;
    },

    deleteEntry(state, action: PayloadAction<number>) {
      state.currentPage.data = state.currentPage.data.filter((item: any) => item.id != action.payload);
    },

    addEntry(state, action: PayloadAction<AddEntry>) {
      const newEntry = { ...action.payload.data };

      // Lets Update Current_page state
      state.currentPage.data = [...state.currentPage.data, { ...newEntry }];

      // Lets Update overall data
      // @ts-ignore
      state[action.payload.type] = [...state[action.payload.type], { ...newEntry }];
    },

    editEntry(state, action: PayloadAction<EditCurrentPage>) {
      const editedEntryIndex = state.currentPage.data.findIndex(
        (entry: any) => entry.id === action.payload.data.id
      );

      state.currentPage.data[editedEntryIndex] = action.payload.data;
    },

    addNotification(state, action: PayloadAction<AddNotification>) {
      // Lets calc last possible ID
      const lastIDofEntry = state.notifications.length
        ? state.notifications[state.notifications.length - 1].id + 1
        : 1;

      const newEntry = { ...action.payload, id: lastIDofEntry, date: Date.now() };

      // Lets Update Notifications state
      state.notifications.push(newEntry);
    },

    deleteNotification(state, action: PayloadAction<number>) {
      state.notifications = state.notifications.filter((item: any) => item.id != action.payload);
    },

    clearNotifications(state) {
      state.notifications = [];
    },
  },
});

export const {
  setInitialData,
  setCurrentPage,
  deleteEntry,
  addEntry,
  editEntry,
  addNotification,
  deleteNotification,
  clearNotifications,
} = dataSlice.actions;
export default dataSlice.reducer;
