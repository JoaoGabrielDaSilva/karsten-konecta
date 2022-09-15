import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const Content = styled.View<{ borderless: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg}px 0px;

  border: 1px solid transparent;
  border-bottom-color: ${({ theme, borderless }) =>
    borderless ? "transparent" : theme.color.background.secondary};
`;

export const Pressable = styled.Pressable`
  flex-direction: row;
`;

export const Left = styled.View``;

export const Right = styled.View`
  flex: 1;

  margin-left: ${({ theme }) => theme.spacing.lg}px;
`;

export const ImageWrapper = styled.View`
  border: 0.5px solid ${({ theme }) => theme.color.background.inverted};
  padding: ${({ theme }) => theme.spacing.sm}px;

  border-radius: ${({ theme }) => theme.radii.md}px;

  width: ${width * 0.2}px;
  height: ${width * 0.2}px;
`;

export const Image = styled.Image`
  flex: 1;
`;

export const Col = styled.View``;

export const Name = styled(Typography).attrs(() => ({
  bold: true,
}))``;

export const Label = styled(Typography).attrs(() => ({
  semibold: true,
}))`
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Code = styled(Typography)`
  color: ${({ theme }) => theme.color.text.secondary};
  margin: ${({ theme }) => theme.spacing.md}px 0px;
`;

export const Ean = styled(Typography)`
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Bottom = styled(Row)`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;

export const DeleteText = styled(Typography)`
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const DeleteIcon = styled(MaterialCommunityIcons)`
  font-size: ${({ theme }) => RFValue(theme.fontSize.lg)}px;

  color: ${({ theme }) => theme.color.text.secondary};

  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;
