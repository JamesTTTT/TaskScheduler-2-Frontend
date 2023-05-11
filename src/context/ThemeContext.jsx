import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

const viableThemes = ["light", "dark"];

const ThemeProvider = ({ children }) => {
  const [colourTheme, setColourTheme] = useState("light");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && viableThemes.includes(theme)) {
      setColourTheme(theme);
    } else {
      localStorage.setItem("theme", "light");
      setColourTheme("light");
    }
  }, []);

  const changeTheme = (selectedTheme) => {
    if (viableThemes.includes(selectedTheme)) {
      localStorage.setItem("theme", selectedTheme);
      setColourTheme(selectedTheme);
    } else {
      throw new Error("Invalid theme");
    }
  };

  return (
    <ThemeContext.Provider value={{ colourTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
