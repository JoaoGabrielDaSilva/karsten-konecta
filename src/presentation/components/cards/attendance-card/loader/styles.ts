import styled from "styled-components/native";
import { Skeleton } from "../../../skeleton/skeleton";
import { Row } from "../../../utils";

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.xl}px
    ${({ theme }) => theme.spacing.lg}px;

  border-radius: ${({ theme }) => theme.radii.md}px;
`;

export const Content = styled.View``;

export const Name = styled(Skeleton)``;

export const Value = styled(Skeleton)`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;
