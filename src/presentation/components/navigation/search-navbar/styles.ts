import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { TextInput } from "../../form/text-input/text-input";
import { Row } from "../../utils";

const { width } = Dimensions.get("window");

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;

  border: 2px solid transparent;
  border-bottom-color: ${({ theme }) => theme.color.background.secondary};
`;

export const Center = styled.View`
  flex: 1;
`;

export const LeftIcon = styled(MaterialCommunityIcons)`
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  color: ${({ theme }) => theme.color.text.primary};

  margin-right: ${({ theme }) => theme.spacing.lg}px;
`;
export const RightIcon = styled(MaterialCommunityIcons)`
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  color: ${({ theme }) => theme.color.text.primary};

  margin-left: ${({ theme }) => theme.spacing.lg}px;
`;

export const DrawerIcon = styled(MaterialCommunityIcons)`
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  color: ${({ theme }) => theme.color.text.primary};

  margin-left: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledTextInput = styled(TextInput)``;

export const FakeInputContainer = styled(TouchableOpacity)<{
  editable?: boolean;
}>`
  height: ${width * 0.11}px;

  background-color: ${({ theme }) => theme.color.background.primary};

  border-radius: ${({ theme }) => theme.radii.sm}px;

  border: 1.5px solid ${({ theme }) => theme.color.background.secondary};

  justify-content: center;

  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const FakeInputPlaceholder = styled.Text`
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const HeaderLeft = styled(Row).attrs(() => ({
  align: "center",
}))`
  flex: 1;
`;

export const HeaderRight = styled(Row).attrs(() => ({
  align: "center",
  justify: "flex-end",
}))``;
