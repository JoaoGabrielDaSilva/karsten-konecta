import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row, Typography } from "../utils";
import { AlertTypes } from "./alert";

const TEXT_COLORS = {
  error: "#821e1c",
  warning: "#663c00",
  info: "#014361",
  success: "#1e4620",
};
const BACKGROUND_COLORS = {
  error: "#fdeded",
  warning: "#fff4e5",
  info: "#e5f6fd",
  success: "#edf7ed",
};

const ICON_COLORS = {
  error: "#ef5350",
  warning: "#ff9800",
  info: "#03a9f4",
  success: "#4caf50",
};

export const Container = styled(Row)<{ type: AlertTypes }>`
  background-color: ${({ type }) => BACKGROUND_COLORS?.[type]};

  padding: ${({ theme }) => theme.spacing.lg}px;

  border-radius: ${({ theme }) => theme.radii.sm}px;
`;

export const Text = styled(Typography)<{ type: AlertTypes }>`
  flex: 1;
  color: ${({ type }) => TEXT_COLORS?.[type]};

  font-size: ${({ theme }) => RFValue(theme.fontSize.sm)}px;
`;

export const Icon = styled(Ionicons)<{ type: AlertTypes }>`
  color: ${({ type }) => ICON_COLORS?.[type]};

  font-size: ${({ theme }) => RFValue(theme.fontSize.lg + 5)}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;
