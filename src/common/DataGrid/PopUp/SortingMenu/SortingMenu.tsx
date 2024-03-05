import { useRef } from "react";
import { PopupMenuWrapper, SortingItem } from "./style";
import classNames from "classnames";
import { FilterParams, DataGridColumn } from "common/DataGrid/types";
import { useOutsideClick } from "hooks/useOutsideClick";

type SortingMenuProps<DataRow> = {
  onLeave: () => void;
  filter: FilterParams;
  setFilter: (val: FilterParams) => void;
  columns: DataGridColumn<DataRow>[];
};

const SortingMenu = <DataRow,>(props: SortingMenuProps<DataRow>): JSX.Element | null => {
  const { onLeave, filter, setFilter, columns } = props;

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onLeave);

  function selectSorting(id: string) {
    if (id === filter.sortingField) {
      setFilter({ ...filter, ascending: !filter.ascending });
    } else {
      setFilter({ ...filter, sortingField: id, ascending: true });
    }
  }

  return (
    <PopupMenuWrapper onMouseLeave={onLeave} onClick={(e) => e.stopPropagation()} ref={ref}>
      {columns.map((item) => {
        if (!item.id) return;

        const active = item.id === filter.sortingField;
        const ascending = filter.ascending;

        return (
          <SortingItem
            key={item.id}
            onClick={() => selectSorting(item.id)}
            className={classNames({ active: active, desc: ascending })}
          >
            {item.title}
          </SortingItem>
        );
      })}
    </PopupMenuWrapper>
  );
};

export default SortingMenu;
