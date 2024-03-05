import { Options } from "common/DataGrid/ColumnsMarkUp/QuickActionsMenu/QuickActionsMenu";
import { DataGridColumn } from "common/DataGrid/types";
import { CommentType } from "store/slices/types";

export const COLUMNS_COMMENTS: DataGridColumn<CommentType>[] = [
  {
    id: "id",
    title: "ID",
    width: "5rem",
    cellTemplate: (dataItem) => <>{dataItem.id}</>,
    sort: (a, b) => {
      if (a.id > b.id) return 1;
      else if (a.id < b.id) return -1;
      else return 0;
    },
  },

  {
    id: "postId",
    title: "Post ID",
    width: "6rem",
    cellTemplate: (dataItem) => <>{dataItem.postId}</>,
    sort: (a, b) => {
      if (a.postId > b.postId) return 1;
      else if (a.postId < b.postId) return -1;
      else return 0;
    },
  },
  {
    id: "name",
    title: "Name",
    cellTemplate: (dataItem) => <>{dataItem.name}</>,
    sort: (a, b) => a.name.localeCompare(b.name),
  },
  {
    id: "email",
    title: "Email",
    width: "9rem",
    cellTemplate: (dataItem) => <>{dataItem.email}</>,
    sort: (a, b) => a.email.localeCompare(b.email),
  },
  {
    id: "body",
    title: "Body",
    cellTemplate: (dataItem) => <>{dataItem.body}</>,
    sort: (a, b) => a.body.localeCompare(b.body),
  },
  {
    id: "",
    title: "",
    width: "5rem",
    cellTemplate: (dataItem, type) => <Options item={dataItem} type={type} />,
  },
];
