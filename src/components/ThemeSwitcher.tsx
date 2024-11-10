import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Switch } from "@nextui-org/react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Theme } from "../types/customType";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Switch
      isSelected={theme === Theme.dark}
      size="md"
      onChange={toggleTheme}
      thumbIcon={() =>
        theme === Theme.light ? <SunOutlined /> : <MoonOutlined />
      }
    />
  );
};
