import { FC, useState } from "react";
import { SelectWrapper, StyledSelect, Warning } from "./style";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Validation } from "types/authConfig";
import { InputTitle } from "ui/Titles";
import RenderCollection from "common/ErrorsHandling/RenderCollection";

type SelectProps = {
  register: UseFormRegister<FieldValues>;
  label: string;
  name: string;
  selectedValue: string;
  selectOptions: { label: string; value: string }[];
  warningMsg?: string;
  rules?: Validation;
  labelValue?: string;
};

const Select: FC<SelectProps> = ({
  selectOptions,
  selectedValue,
  label,
  name,
  register,
  rules,
  warningMsg,
  labelValue,
}) => {
  const [value, setValue] = useState(selectedValue);

  return (
    <SelectWrapper>
      <InputTitle $popup>{label}</InputTitle>

      <StyledSelect {...register(name, rules)} value={value} onChange={(e) => setValue(e.target.value)}>
        // For displaying placeholer
        {labelValue && (
          <option value="" disabled hidden>
            {labelValue}
          </option>
        )}
        // Actual select Options
        <RenderCollection
          collection={selectOptions}
          Component={SelectOption}
          ErrorComponent={<option style={{ color: "red" }}>Error</option>}
        />
      </StyledSelect>

      <Warning>{warningMsg}</Warning>
    </SelectWrapper>
  );
};

export default Select;

// Select Option
type OptionType = { item: { label: string; value: string } };

export const SelectOption = ({ item }: OptionType) => {
  return (
    <option key={item.value} value={item.value}>
      {item.label}
    </option>
  );
};
