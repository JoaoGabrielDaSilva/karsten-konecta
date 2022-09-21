import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row, Typography } from "../utils";

export const Container = styled(Row)<{ borderless: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg}px 0px;

  background-color: ${({ theme }) => theme.color.background.primary};

  border: 1.5px solid transparent;
  border-bottom-color: ${({ theme, borderless }) =>
    borderless ? "transparent" : theme.color.background.secondary};
`;

export const Content = styled.View<{ disabled: boolean }>`
  max-width: 90%;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const Title = styled(Typography).attrs(() => ({
  semibold: true,
}))`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const Label = styled(Typography).attrs(() => ({
  semibold: true,
}))`
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Name = styled(Typography).attrs(() => ({
  semibold: true,
}))`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const Value = styled(Typography).attrs(() => ({ semibold: true }))`
  margin: 2.5px 0px;

  color: ${({ theme }) => theme.color.text.secondary};
`;

export const EditLabel = styled(Typography)<{ disabled: boolean }>`
  color: ${({ theme }) => theme.color.text.secondary};

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const ArrowIcon = styled(MaterialCommunityIcons)<{ disabled: boolean }>`
  font-size: ${({ theme }) => RFValue(theme.fontSize.xl)}px;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
