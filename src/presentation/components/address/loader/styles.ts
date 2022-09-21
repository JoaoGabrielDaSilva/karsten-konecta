import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Skeleton } from "../../skeleton/skeleton";
import { Row, Typography } from "../../utils";

export const Container = styled(Row)<{ borderless: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg}px 0px;

  background-color: ${({ theme }) => theme.color.background.primary};

  border: 1.5px solid transparent;
  border-bottom-color: ${({ theme, borderless }) =>
    borderless ? "transparent" : theme.color.background.secondary};
`;

export const Content = styled.View``;

export const Title = styled(Skeleton)``;

export const Name = styled(Skeleton)`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const Value = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;

  color: ${({ theme }) => theme.color.text.secondary};
`;

export const EditLabel = styled(Typography)`
  margin: ${({ theme }) => theme.spacing.sm}px 0px;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const ArrowIcon = styled(MaterialCommunityIcons)`
  font-size: ${({ theme }) => RFValue(theme.fontSize.xl)}px;
`;

export const RadioButton = styled(Skeleton)``;
