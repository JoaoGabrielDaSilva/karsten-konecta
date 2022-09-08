import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Animated from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ErrorMessage } from "../../error/error-message/error-message";
import { Row, Typography } from "../../utils";

const { width } = Dimensions.get("window");

const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);

export const Container = styled.View``;

export const InputContainer = styled(Row)<{
  size: "normal" | "small";
  editable: boolean;
}>`
  height: ${({ size }) => (size === "normal" ? width * 0.15 : width * 0.11)}px;

  background-color: ${({ theme }) => theme.color.background.primary};

  border-radius: ${({ theme }) => theme.radii.sm}px;

  border: 1.5px solid ${({ theme }) => theme.color.background.secondary};

  padding-right: ${({ theme }) => theme.spacing.md}px;

  opacity: ${({ editable }) => (editable ? 1 : 0.5)};
`;

export const Input = styled(TextInput)<{ error: boolean }>`
  flex: 1;
  height: 100%;

  padding: ${({ theme }) => theme.spacing.md}px;

  color: ${({ theme, error }) =>
    !error ? theme.color.text.primary : theme.color.red[500]};
`;

export const ClearIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.color.text.secondary};

  font-size: ${({ theme }) => RFValue(theme.fontSize.lg)}px;
`;

export const PlaceholderContainer = styled(AnimatedPressable)`
  position: absolute;
`;

export const Placeholder = styled(Typography)`
  font-size: ${({ theme }) => RFValue(theme.fontSize.sm)}px;
`;

export const CustomErrorMessage = styled(ErrorMessage)`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;
