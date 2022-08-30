import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row } from "../../utils";

export const Container = styled(Row)`
  flex: 1;

  padding: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.color.background.secondary};

  border-radius: ${({ theme }) => theme.radii.sm}px;
`;

export const Input = styled.TextInput`
  flex: 1;

  color: ${({ theme }) => theme.color.text.primary};
`;

export const ClearIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.color.text.secondary};

  font-size: ${({ theme }) => RFValue(theme.fontSize.md)}px;
`;
