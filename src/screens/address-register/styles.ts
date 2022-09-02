import styled from "styled-components/native";
import { Row } from "../../components";
import { SelectInput } from "../../components/form/select-input/select-input";
import { TextInput } from "../../components/form/text-input/text-input";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};
`;

export const Form = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const CustomTextInput = styled(TextInput)`
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;

export const StyledSelectInput = styled(SelectInput)`
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;

export const StyledRow = styled(Row)`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;
