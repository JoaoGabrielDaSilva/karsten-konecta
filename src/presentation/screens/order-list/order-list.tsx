import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { ListRenderItemInfo } from "react-native";
import { useTheme } from "styled-components/native";

import {
  OrderCard,
  OrderCardProps,
} from "../../components/cards/order-card/order-card";
import { PaginatedList } from "../../components/list/paginated-list/paginated-list";
import {
  PaginatedListGetFunctionReturn,
  usePaginatedList,
} from "../../hooks/use-paginated-list";

import { RootPrivateStackParamList } from "../../routes";

import { Container } from "./styles";

type NavigationProps = StackScreenProps<RootPrivateStackParamList, "OrderList">;

type Props = NavigationProps;

const attendanceDatabase: OrderCardProps[] = [
  {
    customerName: "João",
    status: "Entregue",
    orderNumber: "PI-00002432",
    createdAt: new Date(),
    totalProductsIn: 5,
  },
  {
    customerName: "João",
    status: "Entregue",
    orderNumber: "PI-00002432",
    createdAt: new Date(),
    totalProductsIn: 5,
  },
  {
    customerName: "João",
    status: "Entregue",
    orderNumber: "PI-00002432",
    createdAt: new Date(),
    totalProductsIn: 5,
  },
  {
    customerName: "João",
    status: "Entregue",
    orderNumber: "PI-00002432",
    createdAt: new Date(),
    totalProductsIn: 5,
  },
  {
    customerName: "João",
    status: "Entregue",
    orderNumber: "PI-00002432",
    createdAt: new Date(),
    totalProductsIn: 5,
  },
  {
    customerName: "João",
    status: "Entregue",
    orderNumber: "PI-00002432",
    createdAt: new Date(),
    totalProductsIn: 5,
  },
  {
    customerName: "João",
    status: "Entregue",
    orderNumber: "PI-00002432",
    createdAt: new Date(),
    totalProductsIn: 5,
  },
  {
    customerName: "João",
    status: "Entregue",
    orderNumber: "PI-00002432",
    createdAt: new Date(),
    totalProductsIn: 5,
  },
  {
    customerName: "João",
    status: "Entregue",
    orderNumber: "PI-00002432",
    createdAt: new Date(),
    totalProductsIn: 5,
  },
  {
    customerName: "João",
    status: "Entregue",
    orderNumber: "PI-00002432",
    createdAt: new Date(),
    totalProductsIn: 5,
  },
  {
    customerName: "João",
    status: "Entregue",
    orderNumber: "PI-00002432",
    createdAt: new Date(),
    totalProductsIn: 5,
  },
  {
    customerName: "João",
    status: "Entregue",
    orderNumber: "PI-00002432",
    createdAt: new Date(),
    totalProductsIn: 5,
  },
];

export const OrderList = ({ navigation: { navigate } }: Props) => {
  const theme = useTheme();
  const { data, loading, onEndReached } = usePaginatedList({
    getFunction: getOrderList,
  });

  async function getOrderList(
    page: number
  ): Promise<PaginatedListGetFunctionReturn<OrderCardProps>> {
    try {
      const newData = await new Promise<OrderCardProps[]>((resolve) =>
        setTimeout(() => {
          const data = attendanceDatabase.slice(page * 5, page * 5 + 5);

          resolve(data);
        }, 1000)
      );

      return {
        data: newData,
        totalResults: attendanceDatabase.length,
      };
    } catch (error) {
      return {
        data: [],
        totalResults: 0,
      };
    }
  }

  const goToOrderDeails = () => navigate("OrderDetails");

  return (
    <Container>
      <PaginatedList
        data={data}
        onEndReached={onEndReached}
        loading={loading}
        renderItem={({ item }: ListRenderItemInfo<OrderCardProps>) => (
          <OrderCard
            {...item}
            style={{ margin: theme.spacing.md }}
            onPress={goToOrderDeails}
          />
        )}
        contentContainerStyle={{
          paddingBottom: theme.spacing.xxl,
        }}
        keyExtractor={(_, index) => String(index)}
      />
    </Container>
  );
};
