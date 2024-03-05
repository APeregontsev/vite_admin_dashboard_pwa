import AvatarWrapper from "common/DataGrid/ColumnsMarkUp/AvatarWrapper/AvatarWrapper";
import { Options } from "common/DataGrid/ColumnsMarkUp/QuickActionsMenu/QuickActionsMenu";
import { DataGridColumn } from "common/DataGrid/types";
import { PhotosType } from "store/slices/types";

export const COLUMNS_PHOTOS: DataGridColumn<PhotosType>[] = [
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
    id: "albumId",
    title: "Album ID",
    width: "7rem",
    cellTemplate: (dataItem) => <>{dataItem.albumId}</>,
    sort: (a, b) => {
      if (a.albumId > b.albumId) return 1;
      else if (a.albumId < b.albumId) return -1;
      else return 0;
    },
  },
  {
    id: "title",
    title: "Title",
    width: "35rem",
    cellTemplate: (dataItem) => <>{dataItem.title}</>,
    sort: (a, b) => a.title.localeCompare(b.title),
  },
  {
    id: "url",
    title: "Avatar",
    width: "8rem",
    cellTemplate: (dataItem) => <AvatarWrapper item={dataItem} />,
    sort: (a, b) => a.title.localeCompare(b.title),
  },
  {
    id: "",
    title: "",
    width: "5rem",
    cellTemplate: (dataItem, type) => <Options item={dataItem} type={type} />,
  },
];
