import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container = styled.View<{
  width: number;
  height: number;
  borderRadius?: number;
}>`
  width: ${({ width }) => (width ? width : 0)}px;
  height: ${({ height }) => (height ? height : 0)}px;

  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : 0)}px;
`;

export const Shimmer = styled(Animated.View)<{
  width: number;
  height: number;
  borderRadius?: number;
}>`
  flex: 1;

  width: ${({ width }) => (width ? width : 0)}px;
  height: ${({ height }) => (height ? height : 0)}px;
`;
