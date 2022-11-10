import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container = styled.View``;

export const Content = styled(Animated.View)`
  padding: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.primary};
`;
