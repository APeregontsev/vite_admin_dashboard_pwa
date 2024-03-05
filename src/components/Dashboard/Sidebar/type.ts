import { Dispatch, SetStateAction } from "react";

export type SidebarProps = {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
};
