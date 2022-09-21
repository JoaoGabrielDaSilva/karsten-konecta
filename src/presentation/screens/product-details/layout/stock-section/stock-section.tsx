import React from "react";
import { StockModel } from "../../../../../domain/models/stock-model";
import { ListRow } from "../../../../components/list/list-row/list-row";
import { StockSectionLoader } from "./loader/stock-section-loader";

import { Container, SectionTitle } from "./styles";

type Props = {
  stocks: StockModel[];
  loading: boolean;
};

export const StockSection = ({ stocks, loading }: Props) => {
  return !loading ? (
    <Container>
      <SectionTitle bold variant="heading">
        Estoque
      </SectionTitle>
      {stocks
        ? stocks.map((item, index) => (
            <ListRow
              key={index}
              label={item.locale}
              value={String(item.availableAmount)}
              borderless={index === stocks.length - 1}
            />
          ))
        : null}
    </Container>
  ) : (
    <StockSectionLoader />
  );
};
