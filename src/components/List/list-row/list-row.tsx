import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {
  Container,
  MaterialLeftIcon,
  MaterialRightIcon,
  FeatherLeftIcon,
  FeatherRightIcon,
  Label,
  LeftSide,
  RightSide,
  Value,
} from "./styles";

type IconFamily = "material" | "feather";

export type ListRowProps = {
  label: string;
  value?: string;
  leftIcon?:
    | keyof typeof MaterialIcons.glyphMap
    | keyof typeof Feather.glyphMap;
  rightIcon?:
    | keyof typeof MaterialIcons.glyphMap
    | keyof typeof Feather.glyphMap;
  color?: string;
  background?: string;
  style?: StyleProp<ViewStyle>;
  borderless?: boolean;
  leftIconFamily?: IconFamily;
  rightIconFamily?: IconFamily;
  onPress?: () => void;
};

export const ListRow = ({
  label,
  value,
  rightIcon,
  leftIcon,
  color,
  leftIconFamily = "material",
  rightIconFamily = "material",
  onPress,

  ...props
}: ListRowProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <Container justify="space-between" align="center" {...props}>
        <LeftSide>
          {leftIcon && leftIconFamily === "material" ? (
            <MaterialLeftIcon color={color} name={leftIcon} />
          ) : (
            <FeatherLeftIcon color={color} name={leftIcon} />
          )}
          {label ? <Label color={color}>{label}</Label> : null}
        </LeftSide>
        <RightSide>
          {value ? <Value color={color}>{value}</Value> : null}
          {rightIcon && rightIconFamily === "material" ? (
            <MaterialRightIcon color={color} name={rightIcon} />
          ) : (
            <FeatherRightIcon color={color} name={rightIcon} />
          )}
        </RightSide>
      </Container>
    </TouchableOpacity>
  );
};
