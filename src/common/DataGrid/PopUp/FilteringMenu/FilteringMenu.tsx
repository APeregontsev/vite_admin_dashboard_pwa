import { useRef } from "react";
import { FormFilter, PopupMenuWrapper } from "./style";
import { FilterParams, DataGridColumn } from "common/DataGrid/types";
import Input from "common/Input";
import Select from "common/Select";
import { useOutsideClick } from "hooks/useOutsideClick";
import { useForm } from "react-hook-form";
import { FilterButton } from "ui/Buttons";

type FilteringMenuProps<DataRow> = {
  onLeave: () => void;
  filter: FilterParams;
  setFilter: (val: FilterParams) => void;
  columns: DataGridColumn<DataRow>[];
};

const FilteringMenu = <DataRow,>(props: FilteringMenuProps<DataRow>): JSX.Element | null => {
  const { onLeave, filter, setFilter, columns } = props;

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onLeave);

  // Data for Select

  const selectOptions = columns
    .filter((column) => column.id)
    .map((column) => {
      return { label: column.title!, value: column.id };
    });

  selectOptions.unshift({ label: "All", value: "all" });

  // Initializing react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // FORM SUBMIT HANDLER
  const onSubmit = async (data: Record<string, string>) => {
    setFilter({ ...filter, searchField: data.select_filter, searchQuery: data.filter });
    onLeave();
  };

  return (
    <PopupMenuWrapper onClick={(e) => e.stopPropagation()} ref={ref}>
      <FormFilter onSubmit={handleSubmit(onSubmit)}>
        <Select
          register={register}
          name={"select_filter"}
          label={"Select field"}
          selectedValue={filter.searchField}
          selectOptions={selectOptions}
        />

        <Input
          popup
          register={register}
          rules={{
            required: {
              value: true,
              message: "Can't be empty",
            },
          }}
          defaultValue={filter.searchQuery}
          key={"filter"}
          type={"text"}
          name={"filter"}
          label={"filter"}
          placeholder={"Enter filter query"}
          warningMsg={errors["filter"]?.message ? errors["filter"]?.message?.toString() : ""}
        />

        <FilterButton type="submit">Apply</FilterButton>
      </FormFilter>
    </PopupMenuWrapper>
  );
};

export default FilteringMenu;
