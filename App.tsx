import React from "react";
import { View } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { Theme } from "./src/presentation/constants/enums/Theme";
import { Router } from "./src/presentation/routes/router";
import { useThemeStore } from "./src/presentation/store/theme";
import { darkTheme, lightTheme } from "./src/presentation/themes";

export default function App() {
  const { theme } = useThemeStore();

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider theme={theme === Theme.DARK ? darkTheme : lightTheme}>
        <Router />
      </ThemeProvider>
    </View>
  );
}
