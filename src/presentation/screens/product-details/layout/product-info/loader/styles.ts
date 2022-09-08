import styled from "styled-components/native";
import { Skeleton } from "../../../../../components/skeleton/skeleton";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: 0px ${({ theme }) => theme.spacing.lg}px;
`;

export const Content = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px 0px;

  border: 0.5px solid transparent;
  border-bottom-color: ${({ theme }) => theme.color.text.secondary};
`;

export const Col = styled.View``;

export const FirstLineName = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const SecondLineName = styled(Skeleton)``;

export const Code = styled(Skeleton)`
  margin: ${({ theme }) => theme.spacing.md}px 0px;
`;

export const Ean = styled(Skeleton)``;
