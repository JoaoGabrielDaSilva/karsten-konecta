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
      emphasis: "#5a5959",
    },
    focused: "#000000",
    unfocused: "#bebdbd",
    blue: {
      100: "#ddecff",
      300: "#60a5e7",
      500: "#2779fc",
      700: "#2571ee",
    },
    red: {
      100: "#f99893",
      300: "#fa5f6c",
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
