import React from "react";
import { Dimensions, StyleProp, ViewStyle } from "react-native";
import { ListRowLoader } from "../../../list/list-row/loader/list-row-loader";

import {
  Container,
  Name,
  Content,
  Value,
  BorderContainer,
  CopyIcon,
  Headline,
} from "./styles";

type Props = {
  style?: StyleProp<ViewStyle>;
};

const { width } = Dimensions.get("window");

export const OrderCardLoader = ({ style }: Props) => {
  return (
    <Container style={style} justify="space-between" align="center">
      <Headline justify="space-between" align="center">
        <Name width={125} height={20} />
        <CopyIcon name="content-copy" />
      </Headline>
      <Content>
        <BorderContainer>
          <Value width={width * 0.3} height={15} />
          <Value width={width * 0.4} height={15} />
          <Value width={width * 0.5} height={15} />
          <Value width={width * 0.35} height={15} />
        </BorderContainer>
      </Content>

      <ListRowLoader rightIcon value={false} borderless />
    </Container>
  );
};
