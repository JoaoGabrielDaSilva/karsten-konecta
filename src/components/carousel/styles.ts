import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions, Image as RnImage } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row, Typography } from "../utils";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  padding-top: ${({ theme }) => theme.spacing.lg}px;
`;

export const Image = styled(RnImage)`
  width: ${width}px;
  height: ${width * 0.7}px;
`;

export const LeftSide = styled.View`
  height: ${width * 0.7}px;
  position: absolute;
  left: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  justify-content: center;
`;
export const RightSide = styled.View`
  height: ${width * 0.7}px;
  position: absolute;
  right: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  justify-content: center;
`;

export const Arrow = styled(MaterialCommunityIcons)<{ disabled: boolean }>`
  font-size: ${({ theme }) => RFValue(theme.fontSize.xl)}px;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const Page = styled(Typography)``;
