import { TypeOptions } from "react-toastify/dist/types";

// Types
export type TodoType = { completed: boolean; id: number; title: string; userId: number; modified?: number };

export type PostType = { body: string; id: number; title: string; userId: number; modified?: number };

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  modified?: number;
};
export type CommentType = {
  name: string;
  id: number;
  email: string;
  postId: number;
  body: string;
  modified?: number;
};
export type PhotosType = {
  title: string;
  id: number;
  url: string;
  albumId: number;
  thumbnailUrl: string;
  modified?: number;
};
export type AlbumsType = { title: string; id: number; userId: number; modified?: number };

export type NotificationType = {
  id: number;
  message: string;
  date: number;
  type: TypeOptions;
  modified?: number;
};

// -----------------------------

/* type AlbumsType = { title: string; id: number; userId: number };
type TodoType = AlbumsType & { completed: boolean };
type PostType = AlbumsType & { body: string };

type CommentType = Omit<PostType, "title"> & { name: string };

type PhotosType = Omit<AlbumsType, "userId"> & { albumId: number; thumbnailUrl: string; url: string };

type UserType = Omit<CommentType, "body" | "userId"> & {
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  username: string;
  website: string;
}; */

// Initial state
export type Progress = "not_loaded" | "loading" | "loaded" | "error";

// Initial State

export type InitialStateType = {
  todos: TodoType[];
  posts: PostType[];
  users: UserType[];
  comments: CommentType[];
  photos: PhotosType[];
  albums: AlbumsType[];
  currentPage: { type: string; data: any[] };
  notifications: NotificationType[];
};

/* type InitialStateType = {
  [key: string]:
    | TodoType[]
    | PostType[]
    | UserType[]
    | CommentType[]
    | PhotosType[]
    | AlbumsType[]
    | { type: string; data: any[] };
  todos: TodoType[];
  posts: PostType[];
  users: UserType[];
  comments: CommentType[];
  photos: PhotosType[];
  albums: AlbumsType[];
  currentPage: { type: string; data: any[] };
}; */

export type InitialDataType = {
  type: "TODOS" | "POSTS" | "USERS" | "COMMENTS" | "PHOTOS" | "ALBUMS";
  data: TodoType[] | PostType[] | UserType[] | CommentType[] | PhotosType[] | AlbumsType[];
};
