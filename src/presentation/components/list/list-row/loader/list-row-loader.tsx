import React from "react";
import { Dimensions, StyleProp, ViewStyle } from "react-native";
import {
  Container,
  Label,
  LeftSide,
  RightSide,
  Value,
  Content,
  LeftIconLoader,
  RightIconLoader,
} from "./styles";

export type Props = {
  leftIcon?: boolean;
  rightIcon?: boolean;
  label?: boolean;
  value?: boolean;
  style?: StyleProp<ViewStyle>;
  borderless?: boolean;
};

const { width } = Dimensions.get("window");

export const ListRowLoader = ({
  label = true,
  value = true,
  rightIcon,
  leftIcon,
  borderless,
  style,
}: Props) => {
  return (
    <Container>
      <Content
        style={style}
        borderless={borderless}
        justify="space-between"
        align="center"
      >
        <LeftSide>
          {leftIcon && <LeftIconLoader width={20} height={15} />}
          {label ? <Label width={width * 0.15} height={15} /> : null}
        </LeftSide>
        <RightSide>
          {value ? <Value width={25} height={15} /> : null}
          {rightIcon && <RightIconLoader width={25} height={15} />}
        </RightSide>
      </Content>
    </Container>
  );
};
