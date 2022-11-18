import { Appearance } from "react-native";
import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    primary: {
      500: "#5a5959",
    },
    secondary: {
      500: "#E6E5DC",
    },
    amber: {
      400: "#d97706",
    },
    border: {
      default: "#c0c0c0",
    },
  },

  components: {
    Input: {
      defaultProps: {
        autoCapitalize: "none",
        autoComplete: "off",
      },
      baseStyle: {
        borderRadius: "md",
      },
    },
    Button: {
      defaultProps: {
        bg: "primary.500",
        size: "md",
        colorScheme: "white",
      },
    },
    Spinner: {
      baseStyle: ({ colorMode }) => ({
        color: colorMode === "dark" ? "white" : "black",
      }),
    },
    Radio: {
      baseStyle: ({ colorMode }) => ({
        borderColor: colorMode === "light" ? "primary.500" : "white",
        borderWidth: 1,
        bg: "transparent",
        _checked: {
          borderColor: colorMode === "light" ? "primary.500" : "white",
          _icon: {
            color: "primary.500",
          },
          _pressed: {
            borderColor: colorMode === "light" ? "primary.500" : "white",
            _icon: {
              color: "primary.500",
            },
          },
        },
      }),
    },
  },
  config: {
    initialColorMode: "light",
  },
});
