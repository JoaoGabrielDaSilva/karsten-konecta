import React, { createContext } from "react";

export const themeContext = createContext({});

type Props = {
  theme: any;
  children: React.ReactElement;
};

export const ThemeProvider = ({ theme, children }: Props) => {
  return (
    <themeContext.Provider value={{ theme }}>{children}</themeContext.Provider>
  );
};
