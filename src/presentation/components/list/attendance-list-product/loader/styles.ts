import styled from "styled-components/native";
import { Skeleton } from "../../../skeleton/skeleton";
import { Row } from "../../../utils";

export const Container = styled.View<{ borderless: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.primary};

  border: 1px solid transparent;
  border-bottom-color: ${({ theme, borderless }) =>
    borderless ? "transparent" : theme.color.background.secondary};
`;

export const Left = styled.View``;

export const Right = styled.View`
  flex: 1;

  margin-left: ${({ theme }) => theme.spacing.lg}px;
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

export const Bottom = styled(Row)`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;

export const DeleteText = styled(Skeleton)``;

export const DeleteIcon = styled(Skeleton)`
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;
