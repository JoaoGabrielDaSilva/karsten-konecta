import React from "react";
import { ListRowLoader } from "../../../../../components/list/list-row/loader/list-row-loader";

import { Container, SectionTitle } from "./styles";

export const StockSectionLoader = () => {
  return (
    <Container>
      <SectionTitle width={100} height={20} />
      <ListRowLoader />
      <ListRowLoader />
      <ListRowLoader />
      <ListRowLoader borderless />
    </Container>
  );
};
