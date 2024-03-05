export type InputProps = {
  inputType: "input";
  type: string;
  name: string;
  label: string;
  placeholder: string;
  validation?: Validation;
};

export type SelectType = {
  inputType: "select";
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  validation?: Validation;
  selectedValue: string;
  labelValue: string;
};

export type SelectOption = { label: string; value: string };

export type Validation = {
  [key: string]:
    | { value: RegExp | boolean | number; message: string }
    | { [key: string]: (value: string) => boolean | string };
};

export type PageType = {
  title: string;
  inputs: (InputProps | SelectType)[];
};

export type ADDConfigType = {
  [key: string]: PageType;
};
