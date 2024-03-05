import { FieldValues, UseFormRegister } from "react-hook-form";
import { Validation } from "../../types/authConfig";

export type InputProps = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  action?: () => void;
  warningMsg?: string;
  register: UseFormRegister<FieldValues>;
  rules?: Validation;
  popup?: boolean;
  defaultValue?: string;
};
