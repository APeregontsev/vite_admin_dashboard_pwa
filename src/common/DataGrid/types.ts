//
export type DataGridProps<DataRow> = {
  isLoading: boolean;
  columns: DataGridColumn<DataRow>[];
  data: DataRow[];
  pagination: PaginationData;
  addBtnTitle: string;
  filter: FilterParams;
  setFilter: React.Dispatch<React.SetStateAction<FilterParams>>;
  type: string;
};

export type FilterParams = {
  searchField: string;
  searchQuery: string;
  sortingField: string;
  ascending: boolean;
};

export type PaginationData = {
  selectOptions: number[];
  entriesPerPage: number;
  totalEntries: number;
  setEntriesPerPage: (val: number) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
};

export type DataGridColumn<DataRow> = {
  id: string;
  title?: string;
  width?: string;
  cellTemplate: (dataItem: DataRow, type: string) => JSX.Element;
  sort?: (a: DataRow, b: DataRow) => number;
};
