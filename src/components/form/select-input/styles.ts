import { Ionicons } from "@expo/vector-icons";
import { Dimensions, TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ErrorMessage } from "../../error/error-message/error-message";
import { Row, Typography } from "../../utils";

const { width } = Dimensions.get("window");

export const Container = styled.View``;

export const InputContainer = styled(Row)<{
  editable: boolean;
}>`
  height: ${width * 0.15}px;

  background-color: ${({ theme }) => theme.color.background.primary};

  border-radius: ${({ theme }) => theme.radii.sm}px;

  border: 1.5px solid ${({ theme }) => theme.color.background.secondary};

  padding-right: ${({ theme }) => theme.spacing.md}px;

  opacity: ${({ editable }) => (editable ? 1 : 0.5)};
`;

export const Input = styled(Row)`
  flex: 1;
  height: 100%;

  padding: ${({ theme }) => theme.spacing.md}px;
  padding-right: 0px;
`;

export const Value = styled(Typography)``;

export const ClearIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.color.text.secondary};

  font-size: ${({ theme }) => RFValue(theme.fontSize.md)}px;
`;

export const Placeholder = styled(Typography)`
  position: absolute;

  color: ${({ theme }) => theme.color.text.secondary};

  font-size: ${({ theme }) => RFValue(theme.fontSize.sm)}px;
`;

export const CustomErrorMessage = styled(ErrorMessage)`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;
