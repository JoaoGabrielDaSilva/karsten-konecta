import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Overlay = styled.View`
  flex: 1;
  background-color: #222222a1;

  justify-content: flex-end;
`;

export const Container = styled(Animated.View)`
  background-color: ${({ theme }) => theme.color.background.primary};

  border-radius: ${({ theme }) => theme.radii.md}px;
`;

export const GripContainer = styled(Animated.View)`
  padding: ${({ theme }) => theme.spacing.lg}px 0px;

  border-radius: ${({ theme }) => theme.radii.md}px;

  align-items: center;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const Grip = styled.View`
  width: 40%;
  height: 5px;

  border-radius: ${({ theme }) => theme.radii.sm}px;

  background-color: ${({ theme }) => theme.color.background.emphasis};
`;
