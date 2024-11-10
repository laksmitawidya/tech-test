import { createContext } from "react";
import { ThemeContextType } from "../types/customType";

import { useEffect, useState } from "react";
import { Theme } from "../types/customType";

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.dark,
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getTheme());

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, []);

  const toggleTheme = () => {
    if (theme === Theme.dark) {
      localStorage.setItem("theme", Theme.light);
      setTheme(Theme.light);
    } else {
      localStorage.setItem("theme", Theme.dark);
      setTheme(Theme.dark);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// helper
const getTheme = () => {
  const theme = localStorage.getItem("theme") as Theme;
  if (!theme) {
    localStorage.setItem("theme", Theme.dark);
    return Theme.dark;
  } else {
    return theme;
  }
};
