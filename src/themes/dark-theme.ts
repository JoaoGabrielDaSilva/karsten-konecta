import { Theme } from "../models/theme";

export const darkTheme: Theme = {
  color: {
    background: {
      primary: "#222",
      secondary: "#444",
    },
    text: {
      primary: "#FFF",
      secondary: "#bbb",
    },
    blue: {
      100: "#91baff",
      300: "#5e98f9",
      500: "#4285f4",
      700: "#2571ee",
    },
    white: "#FFFFFF",
  },
  spacing: {
    sm: 5,
    md: 10,
    lg: 15,
    xl: 20,
    xxl: 25,
  },
  radii: {
    sm: 5,
    md: 10,
    lg: 50,
  },
  fontSize: {
    xsm: 10,
    sm: 12,
    md: 14,
    lg: 18,
    xl: 25,
  },
};
