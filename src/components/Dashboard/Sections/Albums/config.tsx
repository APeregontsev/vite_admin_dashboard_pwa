import { Options } from "common/DataGrid/ColumnsMarkUp/QuickActionsMenu/QuickActionsMenu";
import { DataGridColumn } from "common/DataGrid/types";
import { AlbumsType } from "store/slices/types";

export const COLUMNS_ALBUMS: DataGridColumn<AlbumsType>[] = [
  {
    id: "id",
    title: "ID",
    width: "7rem",
    cellTemplate: (dataItem) => <>{dataItem.id}</>,
    sort: (a, b) => {
      if (a.id > b.id) return 1;
      else if (a.id < b.id) return -1;
      else return 0;
    },
  },

  {
    id: "userId",
    title: "User ID",
    width: "7rem",
    cellTemplate: (dataItem) => <>{dataItem.userId}</>,
    sort: (a, b) => {
      if (a.userId > b.userId) return 1;
      else if (a.userId < b.userId) return -1;
      else return 0;
    },
  },

  {
    id: "title",
    title: "Title",
    cellTemplate: (dataItem) => <>{dataItem.title}</>,
    sort: (a, b) => a.title.localeCompare(b.title),
  },
  {
    id: "",
    title: "",
    width: "5rem",
    cellTemplate: (dataItem, type) => <Options item={dataItem} type={type} />,
  },
];
