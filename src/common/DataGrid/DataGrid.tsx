import { SectionBody, SectionWrapper, TBody, TD, TH, THead, TR, Table } from "./style";
import DataGridHeader from "./Header";
import Pagination from "./Pagination";
import { DataGridColumn, DataGridProps } from "./types";
import RenderCollection from "common/ErrorsHandling/RenderCollection";
import PageLoader from "common/Loaders/PageLoader/PageLoader";

//
function DataGrid<DataRow>(props: DataGridProps<DataRow>): JSX.Element {
  const { isLoading = true, columns, data, pagination, addBtnTitle, filter, setFilter, type } = props;

  return (
    <SectionWrapper>
      <DataGridHeader
        addBtnTitle={addBtnTitle}
        filter={filter}
        setFilter={setFilter}
        columns={columns}
        type={type}
      />

      <SectionBody>
        <Table>
          <THead>
            <TR>
              {columns.map((column) => {
                return (
                  <TH key={column.id} style={{ width: column.width }}>
                    {column.title}
                  </TH>
                );
              })}
            </TR>
          </THead>

          {!isLoading && (
            <TBody>
              <RenderCollection
                collection={data}
                Component={Row}
                componentProps={{ columns: columns, type: type }}
              />
            </TBody>
          )}
        </Table>

        {isLoading && <PageLoader />}
      </SectionBody>

      <Pagination paginationData={pagination} />
    </SectionWrapper>
  );
}

export default DataGrid;

// Row for RenderCollection

type RowType<DataRow> = {
  columns: DataGridColumn<DataRow>[];
  item: DataRow;
  type: string;
};

const Row = <DataRow,>({ item, columns, type }: RowType<DataRow>): JSX.Element => {
  return (
    <TR>
      {columns.map((column) => {
        return <TD key={column.id}>{column.cellTemplate(item, type)}</TD>;
      })}
    </TR>
  );
};
