import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

export const Container = styled(Row)<{ background?: string }>`
  padding: 15px 20px;

  border-radius: ${({ theme }) => theme.radii.sm}px;

  background: ${({ theme, background }) =>
    background || theme.color.background.secondary};
`;

export const Label = styled(Typography)<{ color: string }>`
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  color: ${({ theme, color }) => color || theme.color.text.primary};
`;

export const Icon = styled(MaterialIcons)`
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  color: ${({ theme }) => theme.color.text.primary};
`;
