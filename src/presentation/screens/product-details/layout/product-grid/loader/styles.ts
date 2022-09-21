import styled from "styled-components/native";
import { Skeleton } from "../../../../../components/skeleton/skeleton";

export const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  padding-top: 0;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const SectionTitle = styled(Skeleton)`
  margin: ${({ theme }) => theme.spacing.lg}px 0px;
`;

export const ProductColor = styled(Skeleton)`
  margin-right: ${({ theme }) => theme.spacing.lg}px;
`;

export const ProductSize = styled(Skeleton)`
  margin-right: ${({ theme }) => theme.spacing.lg}px;
`;
