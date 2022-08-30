import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: 20px;
`;

export const BackIcon = styled(MaterialIcons)`
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  color: ${({ theme }) => theme.color.text.primary};
`;
