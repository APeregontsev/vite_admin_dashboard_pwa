import { useMemo } from "react";
import { DataGridColumn, FilterParams } from "./types";

/** SORTING */

export function useSorting<Data>(
  data: Data[],
  sortingField: string,
  ascending: boolean,
  columns: DataGridColumn<Data>[]
): Data[] {
  const sortedData = useMemo(() => {
    if (!sortingField) return data;

    // Getting sorting callback out from Columns
    const fieldSortingLogic = columns.find(
      (column) => column.id?.toLowerCase() === sortingField.toLowerCase()
    )?.sort as (a: Data, b: Data) => number; // maybe through !

    // Applying logic with asc/desc
    const sortingLogic: (a: Data, b: Data) => number = ascending
      ? fieldSortingLogic
      : (a, b) => fieldSortingLogic(a, b) * -1;

    // SORTING
    return [...data].sort(sortingLogic);
  }, [data, sortingField, ascending]);

  return sortedData;
}

/** SEARCH */

export const useFilter = <Data>(
  data: Data[],
  filter: FilterParams,
  columns: DataGridColumn<Data>[]
): Data[] => {
  const { searchQuery, searchField, sortingField, ascending } = filter;

  const sortedData = useSorting(data, sortingField, ascending, columns);

  const filteredData = useMemo(() => {
    function searchCallback(row: Data) {
      // If choosen filtering in ALL fields
      if (searchField === "all") {
        for (const key in row) {
          // @ts-ignore
          if (row[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) return true;
        }
      } else {
        // If choosen filtering in CERTAIN field -- searchField
        // @ts-ignore
        if (row[searchField].toString().toLowerCase().includes(searchQuery.toLowerCase())) return true;
      }
    }

    if (searchQuery) {
      return sortedData.filter(searchCallback);
    } else {
      return sortedData;
    }
  }, [data, searchQuery, searchField, sortingField, ascending]);

  return filteredData;
};
