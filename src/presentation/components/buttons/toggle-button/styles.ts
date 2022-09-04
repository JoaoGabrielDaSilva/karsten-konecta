import Animated from "react-native-reanimated";
import styled from "styled-components/native";

const BUTTON_WIDTH = 50;
const INDICATOR_SIZE = 25;

export const Container = styled.View`
  width: ${BUTTON_WIDTH}px;
  height: 30px;

  padding: 5px;

  background-color: ${({ theme }) => theme.color.blue[500]};

  border-radius: ${({ theme }) => theme.radii.lg}px;

  justify-content: center;
`;

export const Indicator = styled(Animated.View)`
  position: absolute;

  width: ${INDICATOR_SIZE}px;
  height: ${INDICATOR_SIZE}px;

  background-color: ${({ theme }) => theme.color.white};

  border-radius: ${({ theme }) => theme.radii.lg}px;
`;
