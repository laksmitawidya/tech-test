export enum Theme { light = "light", dark = "dark" };

export interface ThemeContextType {
    theme: keyof typeof Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    toggleTheme: () => void;
}