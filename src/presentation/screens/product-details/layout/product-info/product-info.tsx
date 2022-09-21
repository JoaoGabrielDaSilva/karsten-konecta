import React from "react";
import { ProductModel } from "../../../../../domain/models/product";
import { Row } from "../../../../components/utils";
import { AmountButton } from "../../../../components/buttons/amount-button/amount-button";

import { Container, Name, Code, Ean, Col, Content } from "./styles";

type Props = Omit<ProductModel, "uri" | "hasAvailableStock"> & {
  increaseAmount: () => void;
  decreaseAmount: () => void;
  maxAmount: number;
  disabled: boolean;
};

export const ProductInfo = ({
  name,
  code,
  ean,
  amount,
  maxAmount,
  disabled,
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
            disabled={disabled}
            maxAmount={maxAmount}
            amount={amount}
            onDecrease={decreaseAmount}
            onIncrease={increaseAmount}
          />
        </Row>
      </Content>
    </Container>
  );
};
