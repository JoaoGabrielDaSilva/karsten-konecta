import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Skeleton } from "../../../skeleton/skeleton";
import { Row } from "../../../utils";

export const Container = styled(Row)<{ borderless?: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg}px 0px;

  background-color: ${({ theme }) => theme.color.background.primary};

  border: 1px solid transparent;
  border-bottom-color: ${({ theme, borderless }) =>
    borderless ? "transparent" : theme.color.background.secondary};
`;

export const Left = styled.View``;

export const Right = styled.View`
  flex: 1;

  margin-left: ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.sm}px;

  overflow: hidden;
`;

export const Image = styled(Skeleton)``;

export const Col = styled.View``;

export const FirstLineName = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const SecondLineName = styled(Skeleton)``;

export const Code = styled(Skeleton)`
  margin: ${({ theme }) => theme.spacing.lg}px 0px;
`;

export const Ean = styled(Skeleton)`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;
