import { useContext } from "react";
import { themeContext } from "../themes/contexts/theme-context";

export const useTheme = () => useContext(themeContext);
