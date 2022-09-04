import styled from "styled-components/native";
import { TextInput } from "../../components/form/text-input/text-input";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};
`;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const CustomTextInput = styled(TextInput)`
  margin: ${({ theme }) => theme.spacing.xxl}px 0px;
`;
