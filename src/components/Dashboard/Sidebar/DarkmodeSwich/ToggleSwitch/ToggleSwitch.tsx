import { FC } from "react";
import { CheckboxToggle, ToggleSwitchWrapper } from "./style";

type ToggleSwitchProps = {
  action: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
};

const ToggleSwitch: FC<ToggleSwitchProps> = ({ action, value }) => {
  return (
    <ToggleSwitchWrapper>
      <CheckboxToggle
        className="checkbox-toggle"
        type="checkbox"
        id="checkbox-toggle"
        onChange={action}
        checked={value}
      />
      <label htmlFor="checkbox-toggle"></label>
    </ToggleSwitchWrapper>
  );
};

export default ToggleSwitch;
