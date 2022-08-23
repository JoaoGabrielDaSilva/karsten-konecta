import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Row } from "../utils";

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const HeaderLeft = styled.View`
  flex: 1;
`;

export const HeaderRight = styled(Row).attrs(() => ({
  align: "center",
  justify: "flex-end",
}))`
  flex: 1;
`;

export const HeaderIcon = styled(MaterialIcons)`
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  color: ${({ theme }) => theme.color.text.primary};
`;
