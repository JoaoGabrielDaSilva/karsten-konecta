import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components/native";
import { queryClient } from "./src/infra/protocols/cache/query-client";
import { Theme } from "./src/presentation/constants/enums/Theme";
import { Router } from "./src/presentation/routes/router";
import { useThemeStore } from "./src/presentation/store/theme";
import { darkTheme, lightTheme } from "./src/presentation/themes";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NativeBaseProvider } from "native-base";
import { theme as newTheme } from "./src/presentation/themes/new-theme";

export default function App() {
  const { theme } = useThemeStore();

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider theme={theme === Theme.DARK ? darkTheme : lightTheme}>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>
            <NativeBaseProvider theme={newTheme}>
              <Router />
            </NativeBaseProvider>
          </BottomSheetModalProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </View>
  );
}
