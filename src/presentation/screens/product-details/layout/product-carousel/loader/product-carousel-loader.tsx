import React from "react";
import { Dimensions } from "react-native";
import { Skeleton } from "../../../../../components/skeleton/skeleton";
import {
  Container,
  LeftSide,
  RightSide,
  Image,
  Arrow,
  IndexIndicator,
} from "./styles";

const { width } = Dimensions.get("window");

export const ProductCarouselLoader = () => {
  return (
    <Container>
      <Image width={width} height={width * 0.75}>
        <IndexIndicator width={20} height={12} variant="dark" />
      </Image>
      <LeftSide>
        <Arrow name="chevron-left" />
      </LeftSide>
      <RightSide>
        <Arrow name="chevron-right" />
      </RightSide>
    </Container>
  );
};
