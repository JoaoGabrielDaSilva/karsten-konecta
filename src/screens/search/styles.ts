import styled from "styled-components/native";
import { Row } from "../../components";
import { TextInput } from "../../components/form/text-input/text-input";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.primary};

  padding: 0 ${({ theme }) => theme.spacing.md}px;
`;

export const SearchBar = styled(Row)`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

export const Input = styled(TextInput)`
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;
