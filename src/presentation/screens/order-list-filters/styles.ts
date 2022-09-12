import styled from "styled-components/native";
import { Button } from "../../components/buttons/button/button";
import { SelectInput } from "../../components/form/select-input/select-input";
import { TextInput } from "../../components/form/text-input/text-input";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledTextInput = styled(TextInput)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;
export const StyledSelectInput = styled(SelectInput)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;
