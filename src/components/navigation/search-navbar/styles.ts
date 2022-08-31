import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Row } from "../../utils";

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;

  border: 2px solid transparent;
  border-bottom-color: ${({ theme }) => theme.color.background.secondary};
`;

export const Center = styled.View`
  flex: 1;

  margin: 0px ${({ theme }) => theme.spacing.lg}px;
`;

export const HeaderLeft = styled(Row).attrs(() => ({
  align: "center",
}))``;

export const HeaderRight = styled(Row).attrs(() => ({
  align: "center",
}))``;

export const HeaderIcon = styled(MaterialIcons)`
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  color: ${({ theme }) => theme.color.text.primary};
`;
