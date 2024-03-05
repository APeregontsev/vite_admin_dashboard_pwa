import ClearSVG from "./Icons/ClearSVG";
import { FilterAppliedWrapper, SpanColumn, SpanSearch } from "./style";

type FilterAppliedProps = {
  searchQuery: string;
  filterTitle?: string;
  onReset: () => void;
};

const FilterApplied = ({ searchQuery, filterTitle, onReset }: FilterAppliedProps) => {
  if (!searchQuery) return;

  function resetHandler() {
    window.history.pushState({}, document.title, window.location.pathname);
    onReset();
  }

  const fieldDisplay = filterTitle ? filterTitle : "All fields";

  return (
    <FilterAppliedWrapper>
      <SpanSearch title={searchQuery}>"{searchQuery}"</SpanSearch> in
      <SpanColumn> {fieldDisplay}</SpanColumn>
      <ClearSVG action={resetHandler} title="Clear" />
    </FilterAppliedWrapper>
  );
};

export default FilterApplied;
