import { Theme } from "../models/theme";

export const lightTheme: Theme = {
  color: {
    background: {
      primary: "#FFF",
      inverted: "#000",
      secondary: "#E6E5DC",
      emphasis: "#5a5959",
    },
    text: {
      primary: "#000000",
      inverted: "#FFFFFF",
      secondary: "#6a6969",
    },
    focused: "#000000",
    unfocused: "#bebdbd",
    blue: {
      100: "#91baff",
      300: "#5e98f9",
      500: "#4285f4",
      700: "#2571ee",
    },
    red: {
      100: "#f99893",
      300: "#f66b64",
      500: "#f44b42",
      700: "#f5281d",
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
    lg: 16,
    xl: 22,
    xxl: 25,
  },
};
