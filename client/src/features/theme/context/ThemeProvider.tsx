import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

type ThemeProviderProps = {
  children: ReactNode;
};

const getInitialTheme = (): Theme => {
  const storedTheme = localStorage.getItem("cinecue-theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return "dark";
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");

    localStorage.setItem("cinecue-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
