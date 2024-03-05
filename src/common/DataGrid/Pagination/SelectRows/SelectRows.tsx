import { FC, useEffect, useState } from "react";
import { StyledSelect } from "./style";
import { getPagesCount } from "../../../../utils";
import { PaginationData } from "../../types";

type SelectProps = {
  paginationData: PaginationData;
};

const SelectRows: FC<SelectProps> = ({ paginationData }) => {
  const { selectOptions, entriesPerPage, setEntriesPerPage, setCurrentPage, totalEntries, currentPage } =
    paginationData;

  const [value, setValue] = useState(entriesPerPage);

  useEffect(() => {
    // Lets check if we didn't exceeded max possible number of pages with new entries/Page value
    const totalPages = getPagesCount(totalEntries, value);
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);

    // Lets update entries/Page
    setEntriesPerPage(+value);
  }, [value]);

  return (
    <StyledSelect name="entries_per_page" value={value} onChange={(e) => setValue(+e.target.value)}>
      {selectOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StyledSelect>
  );
};

export default SelectRows;
