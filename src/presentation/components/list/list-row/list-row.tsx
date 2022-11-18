import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { Flex } from "native-base";
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
import { Row, RowProps } from "../../utils";

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
  textStyle?: StyleProp<TextStyle>;
  borderless?: boolean;
  leftIconFamily?: IconFamily;
  rightIconFamily?: IconFamily;
  onPress?: () => void;
  numberOfLines?: number;
  testID?: string;
} & RowProps;

export const ListRow = ({
  label,
  value,
  rightIcon,
  leftIcon,
  color,
  leftIconFamily = "material",
  rightIconFamily = "material",
  textStyle,
  onPress,
  numberOfLines,

  ...props
}: ListRowProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <Row
        justify="space-between"
        align="flex-end"
        borderWidth="1"
        borderColor="transparent"
        borderBottomColor={props.borderless ? "transparent" : "border.default"}
        _light={{
          borderRadius: "2xl",
          ...props._light,
        }}
        {...props}
      >
        <LeftSide align="center">
          {leftIcon ? (
            leftIconFamily === "material" ? (
              <MaterialLeftIcon color={color} name={leftIcon} />
            ) : (
              <FeatherLeftIcon color={color} name={leftIcon} />
            )
          ) : null}
          {label ? (
            <Label
              style={textStyle}
              color={color}
              numberOfLines={numberOfLines}
            >
              {label}
            </Label>
          ) : null}
        </LeftSide>
        <RightSide align="center">
          {value ? (
            <Value
              style={textStyle}
              color={color}
              numberOfLines={numberOfLines}
            >
              {value}
            </Value>
          ) : null}
          {rightIcon ? (
            rightIconFamily === "material" ? (
              <MaterialRightIcon color={color} name={rightIcon} />
            ) : (
              <FeatherRightIcon color={color} name={rightIcon} />
            )
          ) : null}
        </RightSide>
      </Row>
    </TouchableOpacity>
  );
};
