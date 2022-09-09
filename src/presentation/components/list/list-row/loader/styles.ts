import { Feather, MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Skeleton } from "../../../skeleton/skeleton";
import { Row } from "../../../utils";

export const Container = styled.View`
  padding: 0px ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const Content = styled(Row)<{ borderless?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xl}px 0px;

  border: 0.5px solid transparent;

  border-bottom-color: ${({ theme, borderless }) =>
    borderless ? "transparent" : theme.color.text.secondary};
`;

export const RightSide = styled(Row)``;

export const LeftSide = styled(Row)``;

export const Label = styled(Skeleton)`
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

export const Value = styled(Skeleton)``;

export const LeftIconLoader = styled(Skeleton)``;
export const RightIconLoader = styled(Skeleton)`
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;
