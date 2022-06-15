import React, { Dispatch, useContext, useState } from "react";
import { themeOptions, themeBackGroundColors } from "../themes"

let defaultTheme = "vs-dark";

themeOptions.forEach((theme) => {
  if (theme.value === defaultTheme) {
    if (!theme.label.includes("Default")) {
      theme.label += " (Default)"
    }
  }
})

if (themeBackGroundColors[defaultTheme]["type"] === "dark") {
  document.querySelector("body")?.classList.add("dark");
}
document.documentElement.style.setProperty(
  "--gutter-color",
  themeBackGroundColors[defaultTheme]["type"] === "light"
    ? "#f0ecec"
    : "#000000"
);

const ThemeContext = React.createContext<string>(defaultTheme);
const ThemeUpdateContext = React.createContext<Dispatch<any>>(() => console.log());

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={setTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}