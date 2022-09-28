import styled from "styled-components/native";
import { Button } from "../../components/buttons/button/button";
import { SelectInput } from "../../components/form/select-input/select-input";
import { ListProduct } from "../../components/list/list-product/list-product";
import { Typography } from "../../components/utils";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};
`;

export const StyledListProduct = styled(ListProduct)`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const TotalContainer = styled.View`
  align-self: flex-end;
  align-items: flex-end;

  padding-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const TotalLabel = styled(Typography)``;

export const Total = styled(Typography)``;

export const Footer = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const Form = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const StyledButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledSelectInput = styled(SelectInput)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;
