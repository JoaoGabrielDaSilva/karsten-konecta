import React from "react";
import { Dimensions } from "react-native";
import { useTheme } from "styled-components/native";
import { AmountButtonLoader } from "../../../buttons/amount-button/loader/amount-button-loader";
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
};

const { width } = Dimensions.get("window");

export const AttendanceListProductLoader = ({ borderless }: Props) => {
  const theme = useTheme();

  return (
    <Container borderless={borderless}>
      <Left>
        <Image
          width={width * 0.2}
          height={width * 0.2}
          borderRadius={theme.radii.md}
        />
      </Left>
      <Right>
        <Row justify="space-between">
          <Col>
            <FirstLineName width={width * 0.68} height={10} />
            <SecondLineName width={width * 0.35} height={10} />
            <Row align="center" justify="space-between">
              <Col>
                <Code width={width * 0.3} height={10} />
                <Ean width={width * 0.35} height={10} />
              </Col>
              <Row style={{ alignSelf: "flex-end" }}>
                <AmountButtonLoader />
              </Row>
            </Row>
          </Col>
        </Row>
      </Right>
    </Container>
  );
};
