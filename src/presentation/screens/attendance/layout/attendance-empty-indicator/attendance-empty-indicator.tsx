import React from "react";

import Image from "../../../../assets/images/shopping-cart.svg";

import { Container, Title, SubTitle } from "./styles";

export const AttendanceEmptyIndicator = () => {
  return (
    <Container>
      {/* <Image /> */}
      <Title semibold>Este carrinho está vazio.</Title>
      <SubTitle semibold>Adicione produtos para realizar a venda.</SubTitle>
    </Container>
  );
};
