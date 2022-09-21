import styled from "styled-components/native";
import { Button } from "../../buttons/button/button";
import { ListProduct } from "../../list/list-product/list-product";
import { Row, Typography } from "../../utils";

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;

  border-radius: ${({ theme }) => theme.radii.md}px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Name = styled(Typography)``;

export const Label = styled(Typography).attrs(() => ({ bold: true }))`
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Value = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing.sm}px;

  color: ${({ theme }) => theme.color.text.secondary};
`;

export const StyledButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledListProduct = styled(ListProduct)`
  max-width: 90%;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;
