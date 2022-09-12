import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Row } from "../../utils";

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;

  border: 2px solid transparent;
  border-bottom-color: ${({ theme }) => theme.color.background.secondary};
`;

export const HeaderLeft = styled(Row).attrs(() => ({
  align: "center",
}))`
  flex: 1;
`;

export const HeaderRight = styled(Row).attrs(() => ({
  align: "center",
  justify: "flex-end",
}))`
  flex: 1;
`;

export const HeaderIcon = styled(MaterialCommunityIcons)`
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  color: ${({ theme }) => theme.color.text.primary};
`;
