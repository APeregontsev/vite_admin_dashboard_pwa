import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { THEME } from "./constants/constants";

export type ModeType = { darkMode: boolean; sidebar: boolean };

type ModeManagerType = {
  darkMode: boolean;
  sidebar: boolean;
  toggleDark: () => void;
  toggleSideBar: () => void;
} & typeof THEME.lightTheme;

export function useModeManager(): ModeManagerType {
  const [theme, setTheme] = useState<ModeType>({ darkMode: false, sidebar: false });

  // Lets save current mode to LocalStorage and then -> save it to the state
  const setMode = (mode: string) => {
    window.localStorage.setItem("theme", mode);

    setTheme((oldMode) => {
      return {
        ...oldMode,
        darkMode: JSON.parse(mode),
      };
    });
  };

  // Lets get saved mode from LocalStorage on page loads
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme &&
      setTheme((state) => {
        return {
          ...state,
          darkMode: JSON.parse(localTheme),
        };
      });
  }, []);

  // Lets return object with all neccessary values and methods
  return {
    ...(theme.darkMode ? THEME.darkTheme : THEME.lightTheme),

    darkMode: theme.darkMode,
    sidebar: theme.sidebar,

    toggleDark: () => {
      setMode(JSON.stringify(!theme.darkMode));
    },

    toggleSideBar: () => {
      setTheme((state) => {
        return {
          ...state,
          sidebar: !state.sidebar,
        };
      });
    },
  };
}

// Lets create the Component to return ThemeProvider with necessary payload and methods

export function ThemeMode(props: { children: any }): JSX.Element {
  const themeInput = useModeManager();

  return <ThemeProvider theme={themeInput}>{props.children}</ThemeProvider>;
}
