import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Appearance, ColorSchemeName } from "react-native";
import { ThemeProvider } from "./src/contexts/theme-context";
import { PrivateRoutes } from "./src/routes";
import { darkTheme, lightTheme } from "./src/themes";

export default function App() {
  const deviceTheme: ColorSchemeName = Appearance.getColorScheme();

  return (
    <View style={styles.container}>
      <StatusBar style={deviceTheme} />
      <ThemeProvider theme={deviceTheme === "light" ? lightTheme : darkTheme}>
        <PrivateRoutes />
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
