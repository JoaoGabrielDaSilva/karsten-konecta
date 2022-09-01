import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

export const Container = styled(Row)<{
  background?: string;
  borderless?: boolean;
}>`
  padding: ${({ theme }) => theme.spacing.xl}px 0px;

  border-radius: ${({ theme }) => theme.radii.sm}px;

  background: ${({ theme, background }) =>
    background || theme.color.background.primary};

  border: 0.5px solid transparent;

  border-bottom-color: ${({ theme, borderless }) =>
    borderless ? "transparent" : theme.color.text.secondary};
`;

export const RightSide = styled(Row)``;

export const Label = styled(Typography)<{ color: string }>`
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  color: ${({ theme, color }) => color || theme.color.text.secondary};
`;

export const Value = styled(Typography)<{ color: string }>`
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  color: ${({ theme, color }) => color || theme.color.text.secondary};
`;

export const Icon = styled(MaterialIcons)`
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  color: ${({ theme }) => theme.color.text.primary};
`;
