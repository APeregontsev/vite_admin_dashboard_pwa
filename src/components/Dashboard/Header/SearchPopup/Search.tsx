import { FC, useEffect, useMemo, useRef, useState } from "react";
import { isEmpty, omit } from "lodash";
import {
  InnerWrapper,
  NothingFound,
  SearchWrapper,
  StatsBlock,
  TabName,
  TableWrapper,
  TabsWrapper,
  TitleWrapper,
} from "./style";
import { InputTitle } from "ui/Titles";
import { useAppSelector } from "store/store";
import { InitialStateType } from "store/slices/types";
import { capitalizeFirstLetter } from "utils";
import { useOutsideClick } from "hooks/useOutsideClick";
import SearchResults from "./SearchResultsTable";
import { useObserver } from "hooks/useObserver";
import { filterData } from "./filtering";

type SearchPopupProps = { searchQuery: string; onLeave: (val: boolean) => void };

type RawDataType = Omit<InitialStateType, "currentPage" | "notifications">;

const SearchPopup: FC<SearchPopupProps> = ({ searchQuery, onLeave }) => {
  // Lets select unfiltered data from store
  let rawData = useAppSelector((state) => state.data);

  // States
  const [activeTab, setActiveTab] = useState("");
  const [page, setPage] = useState(1);
  const entriesPerPage = 10;

  // REFS
  const popupRef = useRef<HTMLDivElement>(null);
  const observeElement = useRef<HTMLDivElement>(null);
  const rootElement = useRef<HTMLDivElement>(null);

  useOutsideClick(popupRef, onLeave);

  // Pages to exclude -> filtering wont be applied
  const excludePages = ["currentPage", "notifications"];

  // Data with excluded pages -> filter to be applied
  const dataToFilter = omit(rawData, excludePages);

  // Lets filter data
  const filteredData = useMemo(() => filterData(dataToFilter as RawDataType, searchQuery), [searchQuery]);

  // Lets define active tab
  useEffect(() => {
    if (!isEmpty(filteredData)) setActiveTab(filteredData[0].key);
  }, [filteredData]);

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  // Lets define tab for rendering
  const renderTab = activeTab ? filteredData.find((tab) => tab.key === activeTab) : null;

  const dataForRendering = renderTab?.data.slice(0, page * entriesPerPage);

  const columnsNames =
    activeTab && !isEmpty(renderTab?.data)
      ? Object.keys(renderTab?.data[0]).filter((column) => column != "modified")
      : null;

  const maxPages = Math.ceil(renderTab?.data.length ? renderTab?.data.length / entriesPerPage : 1);

  // Observer for loading on demand
  useObserver(observeElement, rootElement, activeTab, page, page < maxPages, () =>
    setPage((state) => state + 1)
  );

  // Stats
  const showingEntries = dataForRendering ? dataForRendering.length : 0;
  const totalEntries = renderTab?.data ? renderTab?.data.length : 0;

  return (
    <SearchWrapper ref={popupRef} onBlurCapture={() => onLeave(false)}>
      <InnerWrapper>
        <TitleWrapper>
          <InputTitle>Search results</InputTitle>
        </TitleWrapper>

        <TabsWrapper>
          {useMemo(
            () =>
              filteredData.map((tab, index) => (
                <TabName
                  key={index}
                  $active={tab.key === activeTab}
                  onClick={() => {
                    setPage(1);
                    setActiveTab(tab.key);
                  }}
                >
                  {capitalizeFirstLetter(tab.key)} ({tab.data.length})
                </TabName>
              )),
            [filteredData, activeTab]
          )}

          {}
        </TabsWrapper>

        {isEmpty(filteredData) && <NothingFound>Nothing found</NothingFound>}

        <TableWrapper ref={rootElement} key={activeTab}>
          <SearchResults
            activeTab={activeTab}
            columnsNames={columnsNames}
            renderTab={dataForRendering}
            searchQuery={searchQuery}
            onLeave={onLeave}
          />
          <div ref={observeElement}></div>
        </TableWrapper>
        <StatsBlock>
          {showingEntries} of {totalEntries}
        </StatsBlock>
      </InnerWrapper>
    </SearchWrapper>
  );
};

export default SearchPopup;
