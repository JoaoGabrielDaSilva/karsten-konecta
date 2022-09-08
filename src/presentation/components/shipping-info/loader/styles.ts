import styled from "styled-components/native";
import { Skeleton } from "../../skeleton/skeleton";

export const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px 0px;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const Label = styled(Skeleton)`
  margin: ${({ theme }) => theme.spacing.sm}px 0px;
`;

export const Value = styled(Skeleton)`
  margin: ${({ theme }) => theme.spacing.sm}px 0px;
`;
