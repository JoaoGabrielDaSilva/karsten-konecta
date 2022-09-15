import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Skeleton } from "../../../../../components/skeleton/skeleton";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding-bottom: ${({ theme }) => theme.spacing.md}px;
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

export const Image = styled(Skeleton)``;

export const Arrow = styled(MaterialCommunityIcons)<{ disabled: boolean }>`
  font-size: ${({ theme }) => RFValue(theme.fontSize.xl)}px;

  opacity: 0.5;
`;

export const IndexIndicator = styled(Skeleton)`
  position: absolute;
  bottom: -10px;

  align-self: center;
`;
