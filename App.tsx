import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PrivateRoutes } from "./src/routes";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./src/themes";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <ThemeProvider theme={darkTheme}>
        <PrivateRoutes />
      </ThemeProvider>
    </View>
  );
}
