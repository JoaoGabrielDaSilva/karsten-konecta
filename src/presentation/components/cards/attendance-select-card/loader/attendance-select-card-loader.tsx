import React from "react";
import { Dimensions, StyleProp, ViewStyle } from "react-native";
import { ListProductLoader } from "../../../list/list-product/loader/list-product-loader";
import {
  Container,
  Name,
  Content,
  Value,
  RadioButton,
  StyledListProductLoader,
} from "./styles";

type Props = {
  style?: StyleProp<ViewStyle>;
};

const { width } = Dimensions.get("window");

export const AttendanceSelectCardLoader = ({ style }: Props) => {
  return (
    <Container style={style} justify="space-between">
      <Content>
        <Name width={70} height={15} />
        <Value width={width * 0.2} height={10} />
        <Value width={width * 0.3} height={10} />
        <Value width={width * 0.22} height={10} />
        <Value width={width * 0.25} height={10} />

        <StyledListProductLoader
          borderless
          rightContainerStyle={{ maxWidth: "60%" }}
        />
      </Content>
      <RadioButton width={25} height={25} borderRadius={25} />
    </Container>
  );
};
