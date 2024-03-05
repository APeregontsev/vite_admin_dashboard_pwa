import { FC } from "react";
import { MenuDivider, Wrapper } from "./style";
import { Link } from "react-router-dom";
import LogoBlock from "common/LogoBlock";
import { useCurrentPath } from "hooks/useCurrentPath";
import { MenuItem } from "ui/MenuItem";
import { CONFIG_DASHBOARD } from "../config";
import DarkModeSwich from "./DarkmodeSwich/DarkmodeSwich";
import { CloseSidebarSVG } from "./Icons/sidebarIcons";
import { useTheme } from "styled-components";

const Sidebar: FC = () => {
  const { addressPath } = useCurrentPath();

  //For Showing Sidebar
  const theme = useTheme();

  return (
    <Wrapper>
      <CloseSidebarSVG onClick={theme.toggleSideBar} />
      <LogoBlock header={true} />

      <nav>
        <ul>
          {CONFIG_DASHBOARD.map((menuItem) => {
            const active = menuItem.name.toLowerCase() === addressPath;

            if (!menuItem.category)
              return (
                <Link
                  to={`/dashboard/${menuItem.name.toLowerCase()}`}
                  onClick={(e) => active && e.preventDefault()}
                  key={menuItem.id}
                >
                  <MenuItem className={active ? "active" : ""}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d={menuItem.svgIconPath} />
                    </svg>

                    <span>{menuItem.name}</span>
                  </MenuItem>
                </Link>
              );
          })}
        </ul>
      </nav>

      <MenuDivider></MenuDivider>

      <div>
        <ul>
          {CONFIG_DASHBOARD.map((menuItem) => {
            const active = menuItem.name.toLowerCase() === addressPath;

            if (menuItem.category)
              return (
                <Link to={`/dashboard/${menuItem.name.toLowerCase()}`} key={menuItem.id}>
                  <MenuItem className={active ? "active" : ""}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d={menuItem.svgIconPath} />
                    </svg>
                    <span>{menuItem.name}</span>
                  </MenuItem>
                </Link>
              );
          })}
        </ul>
      </div>

      <DarkModeSwich />
    </Wrapper>
  );
};

export default Sidebar;
