import { render, RenderResult } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { lightTheme } from "../../../src/presentation/themes";

type Props = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};

type Params = {
  Screen: React.FC;
};

type Result = RenderResult;

export const renderWithProviders = ({ Screen }: Params): Result => {
  return render(<Screen />, { wrapper: AppProviders });
};
