import React from "react";
import { Dimensions } from "react-native";
import { Row } from "../../../../../components";
import { AmountButtonLoader } from "../../../../../components/buttons/amount-button/loader/amount-button-loader";

import {
  Container,
  FirstLineName,
  SecondLineName,
  Code,
  Ean,
  Col,
  Content,
} from "./styles";

const { width } = Dimensions.get("window");

export const ProductInfoLoader = () => {
  return (
    <Container>
      <Content>
        <FirstLineName width={width * 0.7} height={15} />
        <SecondLineName width={width * 0.2} height={15} />
        <Row justify="space-between" align="flex-end">
          <Col>
            <Code width={width * 0.3} height={15} />
            <Ean width={width * 0.45} height={15} />
          </Col>
          <AmountButtonLoader />
        </Row>
      </Content>
    </Container>
  );
};
