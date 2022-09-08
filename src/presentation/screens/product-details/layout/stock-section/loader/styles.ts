import styled from "styled-components/native";
import { Skeleton } from "../../../../../components/skeleton/skeleton";

export const Container = styled.View`
  padding-bottom: 0px;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const SectionTitle = styled(Skeleton)`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  margin-left: ${({ theme }) => theme.spacing.lg}px;
`;
