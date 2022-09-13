import { Theme } from "../models/theme";

export const darkTheme: Theme = {
  color: {
    background: {
      primary: "#222",
      inverted: "#EEE",
      secondary: "#444",
      emphasis: "#ccc",
    },
    text: {
      primary: "#FFF",
      inverted: "#000000",
      secondary: "#bbb",
      emphasis: "#ccc",
    },
    focused: "",
    unfocused: "",
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
