import React from "react";
import { Row } from "../../../../components";
import { AmountButton } from "../../../../components/buttons/amount-button/amount-button";
import { AttendanceProductModel } from "../../../../models/Attendance";

import { Container, Name, Code, Ean, Col, Content } from "./styles";

type Props = AttendanceProductModel & {
  increaseAmount: () => void;
  decreaseAmount: () => void;
};

export const ProductInfo = ({
  name,
  code,
  ean,
  amount,
  increaseAmount,
  decreaseAmount,
}: Props) => {
  return (
    <Container>
      <Content>
        <Name variant="heading" bold>
          {name}
        </Name>
        <Row justify="space-between" align="flex-end">
          <Col>
            <Code>Código: {code}</Code>
            <Ean>EAN: {ean}</Ean>
          </Col>
          <AmountButton
            amount={amount}
            onDecrease={decreaseAmount}
            onIncrease={increaseAmount}
          />
        </Row>
      </Content>
    </Container>
  );
};
