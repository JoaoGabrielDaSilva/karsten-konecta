import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};

  border-radius: ${({ theme }) => theme.radii.md}px;
`;

export const Headline = styled(Row)`
  padding: ${({ theme }) => theme.spacing.lg}px;
  padding-left: ${({ theme }) => theme.spacing.xl}px;
`;

export const BorderContainer = styled.View`
  padding-bottom: ${({ theme }) => theme.spacing.xl}px;

  border: 1px solid transparent;

  border-bottom-color: ${({ theme }) => theme.color.unfocused};
`;

export const Content = styled.View`
  padding: 0px ${({ theme }) => theme.spacing.xl}px;
`;

export const Name = styled(Typography)``;

export const Label = styled(Typography).attrs(() => ({ bold: true }))`
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Value = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing.sm}px;

  color: ${({ theme }) => theme.color.text.secondary};
`;

export const CopyIcon = styled(MaterialIcons)`
  font-size: ${({ theme }) => RFValue(theme.fontSize.lg)}px;
  color: ${({ theme }) => theme.color.text.secondary};
`;
