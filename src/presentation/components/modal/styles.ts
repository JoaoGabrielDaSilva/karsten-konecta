import { Dimensions, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { Typography } from "../../components/utils/typography/typography";
import { Row, SectionTitle } from "../../components/utils";

const { width } = Dimensions.get("window");

export const Overlay = styled(TouchableOpacity)`
  flex: 1;

  justify-content: center;
  align-items: center;

  background-color: #21252966;
`;

export const Container = styled(Animated.View)`
  width: ${width * 0.8}px;
  min-height: ${width * 0.45}px;

  padding: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.primary};

  border-radius: ${({ theme }) => theme.radii.md}px;

  justify-content: space-between;
`;

export const StyledSectionTitle = styled(SectionTitle)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const Text = styled(Typography)``;

export const TopSide = styled.View``;

export const ButtonContainer = styled(Row)`
  margin-top: ${({ theme }) => theme.spacing.xxl}px;
`;
