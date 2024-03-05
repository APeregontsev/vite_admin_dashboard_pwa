import DataGrid from "common/DataGrid";
import { FilterParams } from "common/DataGrid/types";
import { useFilter } from "common/DataGrid/useFilter";
import { useEffect, useState } from "react";
import { useLoadCurrentPage } from "store/slices/loadDataHooks";
import { useAppSelector } from "store/store";
import { COLUMNS_PHOTOS } from "./config";
import { PhotosType } from "store/slices/types";

const Photos = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterParams>({
    searchField: "all",
    searchQuery: "",
    sortingField: "id",
    ascending: true,
  });

  // DataGrid DATA
  const type = "photos";

  let params = new URLSearchParams(document.location.search);
  let idParams = params ? params.get("id") : null;

  // Enties per page
  const selectOptions = [5, 10, 15, 20];

  // Loading current page
  const { isLoading, totalCount, searchedPage } = useLoadCurrentPage(type, limit, page, idParams);

  useEffect(() => {
    if (!idParams) return;
    setFilter({ ...filter, searchField: "id", searchQuery: idParams });
  }, [idParams]);

  useEffect(() => {
    if (!searchedPage) return;
    const maxPage = Math.ceil(totalCount / limit) === 0 ? 1 : Math.ceil(totalCount / limit);
    setPage(searchedPage > maxPage ? maxPage : searchedPage);
  }, [searchedPage, totalCount]);

  // Obtaining current page data from the store
  const selectData = useAppSelector((state) => {
    return state.data.currentPage;
  });

  // Checking if data type === type of the Grid, if no -> returning []
  const data = selectData.type === type ? (selectData.data as PhotosType[]) : [];

  //Data after applying filter AND sorting
  const filteredData = useFilter(data, filter, COLUMNS_PHOTOS);

  // Data for pagination
  const paginationData = {
    selectOptions: selectOptions,
    entriesPerPage: limit,
    totalEntries: totalCount,
    setEntriesPerPage: setLimit,
    currentPage: page,
    setCurrentPage: setPage,
  };

  return (
    <DataGrid
      key={type}
      isLoading={isLoading}
      columns={COLUMNS_PHOTOS}
      data={filteredData}
      pagination={paginationData}
      addBtnTitle={"photo"}
      filter={filter}
      setFilter={setFilter}
      type={type}
    />
  );
};

export default Photos;
