import { FC, useMemo } from "react";
import MarkedString from "../MarkString/MarkedString";
import { Table, THead, TR, TH, TBody, TD } from "./style";
import { objectToString } from "utils";
import { useNavigate } from "react-router-dom";

type SearchResultsProps = {
  searchQuery: string;
  activeTab: string;
  columnsNames: string[] | null;
  renderTab: any[] | undefined;
  onLeave: (val: boolean) => void;
};

const SearchResults: FC<SearchResultsProps> = (props) => {
  const { searchQuery, activeTab, columnsNames, renderTab, onLeave } = props;
  const navigate = useNavigate();

  // On row click handler
  function navigateHandler(id: number) {
    navigate(`/dashboard/${activeTab}?id=${id}`);
    onLeave(false);
  }

  return (
    <Table>
      <THead>
        <TR>
          {useMemo(
            () =>
              columnsNames?.map((column, index) => {
                return <TH key={index + column}>{column}</TH>;
              }),
            [columnsNames]
          )}
        </TR>
      </THead>

      <TBody>
        {useMemo(
          () =>
            renderTab?.map((row, index) => {
              return (
                <TR key={`${index}row`} onClick={() => navigateHandler(row.id)}>
                  {columnsNames?.map((column, index) => {
                    return (
                      <TD key={`${index}cell`}>
                        <MarkedString
                          dataToMark={
                            typeof row[column] === "string"
                              ? row[column]
                              : typeof row[column] === "object"
                              ? objectToString(row[column])
                              : JSON.stringify(row[column])
                          }
                          searchData={searchQuery}
                        />
                      </TD>
                    );
                  })}
                </TR>
              );
            }),
          [renderTab, columnsNames, activeTab]
        )}
      </TBody>
    </Table>
  );
};

export default SearchResults;
