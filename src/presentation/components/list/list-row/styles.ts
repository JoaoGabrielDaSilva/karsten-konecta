import { Feather, MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

export const Container = styled(Row)<{
  background?: string;
  borderless?: boolean;
}>`
  padding: ${({ theme }) => theme.spacing.xl}px 0px;

  background: ${({ theme, background }) =>
    background || theme.color.background.primary};

  border: 0.5px solid transparent;

  border-bottom-color: ${({ theme, borderless }) =>
    borderless ? "transparent" : theme.color.text.secondary};
`;

export const RightSide = styled(Row)`
  justify-content: flex-end;
`;

export const LeftSide = styled(Row)`
  max-width: 60%;
`;

export const Label = styled(Typography)<{ color: string }>`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  color: ${({ theme, color }) => color || theme.color.text.secondary};
`;

export const Value = styled(Typography)<{ color: string }>`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  color: ${({ theme, color }) => color || theme.color.text.secondary};
`;

export const MaterialLeftIcon = styled(MaterialIcons)<{ color: string }>`
  margin-right: ${({ theme }) => theme.spacing.md}px;

  font-size: ${({ theme }) => RFValue(theme.fontSize.lg)}px;
  color: ${({ theme, color }) => color || theme.color.text.secondary};
`;
export const MaterialRightIcon = styled(MaterialIcons)<{ color: string }>`
  font-size: ${({ theme }) => RFValue(theme.fontSize.lg)}px;
  color: ${({ theme, color }) => color || theme.color.text.secondary};
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;
export const FeatherLeftIcon = styled(Feather)<{ color: string }>`
  margin-right: ${({ theme }) => theme.spacing.md}px;

  font-size: ${({ theme }) => RFValue(theme.fontSize.lg)}px;
  color: ${({ theme, color }) => color || theme.color.text.secondary};
`;
export const FeatherRightIcon = styled(Feather)<{ color: string }>`
  font-size: ${({ theme }) => RFValue(theme.fontSize.lg)}px;
  color: ${({ theme, color }) => color || theme.color.text.secondary};

  margin-left: ${({ theme }) => theme.spacing.md}px;
`;
