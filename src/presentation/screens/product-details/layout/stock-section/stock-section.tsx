import React from "react";
import { ListRow } from "../../../../components/list/list-row/list-row";
import { StoreStockModel } from "../../../../models/StoreStock";

import { Container, SectionTitle } from "./styles";

type Props = {
  stocks: StoreStockModel[];
};

export const StockSection = ({ stocks }: Props) => {
  return (
    <Container>
      <SectionTitle bold variant="heading">
        Estoque
      </SectionTitle>
      {stocks &&
        stocks.map((item, index) => (
          <ListRow
            label={item.store}
            value={String(item.availableAmount)}
            borderless={index === stocks.length - 1}
          />
        ))}
    </Container>
  );
};
