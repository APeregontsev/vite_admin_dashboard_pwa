import { useState } from "react";
import { AddBtnWrapper, ButtonWrapper, HeaderIconsWrapper, SectionHeader } from "./style";
import { DataGridColumn, FilterParams } from "../types";
import Modal from "common/Modal";
import UpdatingForm from "common/UpdatingForm";
import { AddButton } from "ui/Buttons";
import FilteringMenu from "../PopUp/FilteringMenu";
import SortingMenu from "../PopUp/SortingMenu";
import FilterApplied from "./FilterApplied/FilterApplied";
import { SortIconSVG, FilterIconSVG } from "./Icons/DataGridHeaderIcons";

type DataGridHeaderProps<DataRow> = {
  addBtnTitle: string;
  filter: FilterParams;
  type: string;
  setFilter: (val: FilterParams) => void;
  columns: DataGridColumn<DataRow>[];
};

const DataGridHeader = <DataRow,>(props: DataGridHeaderProps<DataRow>): JSX.Element => {
  const { addBtnTitle, filter, setFilter, columns, type } = props;

  const [showAddModal, setShowAddModal] = useState(false);
  const [showSorting, setShowSorting] = useState(false);
  const [showFiltering, setShowFiltering] = useState(false);

  function showSortingHandler() {
    setShowSorting(!showSorting);
  }

  function showFilteringHandler() {
    setShowFiltering(!showFiltering);
  }

  // For Filter applied block
  const filterTitle = columns.find((item) => item.id === filter.searchField);

  function filterReset() {
    setFilter({ ...filter, searchField: "all", searchQuery: "" });
  }

  // Modal Add

  function onAdd() {
    setShowAddModal(true);
  }

  function closeAddModal() {
    setShowAddModal(false);
  }

  return (
    <SectionHeader>
      <HeaderIconsWrapper>
        <ButtonWrapper onClick={showSortingHandler} $active={showSorting}>
          <SortIconSVG />
          <span>Sort</span>

          {showSorting && (
            <SortingMenu
              onLeave={showSortingHandler}
              filter={filter}
              setFilter={setFilter}
              columns={columns}
            />
          )}
        </ButtonWrapper>

        <ButtonWrapper onClick={showFilteringHandler} $active={showFiltering}>
          <FilterIconSVG />
          <span>Filter</span>

          {showFiltering && (
            <FilteringMenu
              onLeave={showFilteringHandler}
              filter={filter}
              setFilter={setFilter}
              columns={columns}
            />
          )}
        </ButtonWrapper>

        <FilterApplied
          searchQuery={filter.searchQuery}
          filterTitle={filterTitle?.title}
          onReset={filterReset}
        />
      </HeaderIconsWrapper>

      <AddBtnWrapper>
        <AddButton onClick={onAdd}>+ Add {addBtnTitle}</AddButton>
      </AddBtnWrapper>

      <Modal isShown={showAddModal} onClose={closeAddModal}>
        <UpdatingForm type={type} onClose={closeAddModal} />
      </Modal>
    </SectionHeader>
  );
};

export default DataGridHeader;
