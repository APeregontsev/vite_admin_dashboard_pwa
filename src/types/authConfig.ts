import { UserCredential } from "firebase/auth";

export type InputProps = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  action?: () => void;
  warningMsg?: string;
  validation?: Validation;
};

export type Validation = {
  [key: string]:
    | { value: RegExp | boolean | number; message: string }
    | { [key: string]: (value: string) => boolean | string };
};

export type PageType = {
  title: string;
  subtitle: string;
  inputs: InputProps[];
  submitButtonLabel: string;
  redirectLink?: string;
  successMessage?: string;
  fireBaseMethod: (options: Record<string, string>) => Promise<UserCredential | void> | undefined;
};

export type AuthConfigType = {
  [key: string]: PageType;
};
