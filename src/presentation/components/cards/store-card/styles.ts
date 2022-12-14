import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.xl}px
    ${({ theme }) => theme.spacing.lg}px;

  border-radius: ${({ theme }) => theme.radii.md}px;
`;

export const Content = styled.View`
  flex: 0.95;
`;

export const Name = styled(Typography)``;

export const CorporateName = styled(Typography)``;

export const Label = styled(Typography)``;

export const Cnpj = styled(Typography)``;
