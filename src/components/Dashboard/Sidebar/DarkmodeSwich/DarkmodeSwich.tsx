import { useTheme } from "styled-components";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { Dayswitch, FooterSwitch, Nightswitch } from "./style";
import { DayIconSVG, NightIconSVG } from "./Icons/DarkmodeIcons";

const DarkModeSwich = () => {
  const theme = useTheme();

  return (
    <FooterSwitch>
      <Dayswitch>
        <DayIconSVG />
      </Dayswitch>

      <ToggleSwitch action={theme.toggleDark} value={theme.darkMode} />

      <Nightswitch>
        <NightIconSVG />
      </Nightswitch>
    </FooterSwitch>
  );
};

export default DarkModeSwich;
