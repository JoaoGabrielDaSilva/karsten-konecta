import React from "react";
import { Dimensions, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "styled-components/native";
import { Row } from "../../../utils";
import {
  Container,
  Left,
  Right,
  Image,
  Code,
  Ean,
  Col,
  FirstLineName,
  SecondLineName,
} from "./styles";

type Props = {
  borderless?: boolean;
  style?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
};

const { width } = Dimensions.get("window");

export const ListProductLoader = ({ rightContainerStyle, ...props }: Props) => {
  const theme = useTheme();

  return (
    <Container {...props}>
      <Left>
        <Image
          width={width * 0.2}
          height={width * 0.2}
          borderRadius={theme.radii.md}
        />
      </Left>
      <Right style={rightContainerStyle}>
        <Col>
          <FirstLineName width={width * 0.6} height={10} />
          <SecondLineName width={width * 0.35} height={10} />
          <Row align="center" justify="space-between">
            <Col>
              <Code width={width * 0.3} height={10} />
              <Ean width={width * 0.35} height={10} />
            </Col>
          </Row>
        </Col>
      </Right>
    </Container>
  );
};
