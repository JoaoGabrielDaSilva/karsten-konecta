import { Appearance } from "react-native";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Theme } from "../constants/enums/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme:
          Appearance.getColorScheme() === "light" ? Theme.LIGHT : Theme.DARK,
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
          })),
      }),
      { name: "theme-storage", getStorage: () => AsyncStorage }
    )
  )
);
