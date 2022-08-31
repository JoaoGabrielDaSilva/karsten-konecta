import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PrivateRoutes } from "./src/routes";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./src/themes";
import { useThemeStore } from "./src/store/theme";
import { Theme } from "./src/constants/enums/Theme";

export default function App() {
  const { theme } = useThemeStore();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <ThemeProvider theme={theme === Theme.DARK ? darkTheme : lightTheme}>
        <PrivateRoutes />
      </ThemeProvider>
    </View>
  );
}
