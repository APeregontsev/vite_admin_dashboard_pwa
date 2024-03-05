import { FC } from "react";
import { LeftArrowSVG, RightArrowSVG } from "./Icons/PaginationIcons";
import {
  DisplayRowsWrapper,
  PaginationWrapper,
  SelectPageWrapper,
  SelectRowsWrapper,
  SelectWrapper,
} from "./style";
import { ArrowButton } from "ui/Buttons";
import { PaginationData } from "../types";
import SelectRows from "./SelectRows";

type PaginationProps = {
  paginationData: PaginationData;
};

const Pagination: FC<PaginationProps> = ({ paginationData }) => {
  const { currentPage, entriesPerPage, totalEntries, setCurrentPage } = paginationData;

  // Data for display
  const shownFrom = (currentPage - 1) * entriesPerPage + 1;
  const shownTo = shownFrom + entriesPerPage - 1;

  const prevDisabled = (currentPage - 1) * entriesPerPage <= 0;
  const nextDisabled = (currentPage + 1) * entriesPerPage > totalEntries;

  function prevPageHandler() {
    setCurrentPage(currentPage - 1);
  }
  function nextPageHandler() {
    setCurrentPage(currentPage + 1);
  }

  return (
    <PaginationWrapper>
      <SelectRowsWrapper>
        <span>Rows per page:</span>

        <SelectWrapper>
          <SelectRows paginationData={paginationData} />
        </SelectWrapper>
      </SelectRowsWrapper>

      <DisplayRowsWrapper>
        <span>
          {shownFrom}-{shownTo} of {totalEntries}
        </span>

        <SelectPageWrapper>
          <ArrowButton disabled={prevDisabled} onClick={prevPageHandler} title="Previous page">
            <LeftArrowSVG />
          </ArrowButton>
          <ArrowButton disabled={nextDisabled} onClick={nextPageHandler} title="Next page">
            <RightArrowSVG />
          </ArrowButton>
        </SelectPageWrapper>
      </DisplayRowsWrapper>
    </PaginationWrapper>
  );
};

export default Pagination;
