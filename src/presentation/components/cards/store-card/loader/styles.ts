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

export const CorporateName = styled(Skeleton)`
  margin: ${({ theme }) => theme.spacing.sm}px 0px;
`;

export const Cnpj = styled(Skeleton)``;

export const RadioButton = styled(Skeleton)``;
