import React, { useState } from "react";
import ThemeContext from "../ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // set default theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")); // toggle theme
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
