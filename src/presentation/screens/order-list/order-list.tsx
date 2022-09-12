import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ListRenderItemInfo } from "react-native";
import { useTheme } from "styled-components/native";
import { GetOrderList } from "../../../domain/usecases/attendance/get-order-list";
import { OrderCardLoader } from "../../components/cards/order-card/loader/order-card-loader";

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
import { useOrderListFiltersStore } from "../../store/order-list-filters";

import { Container } from "./styles";

type NavigationProps = StackScreenProps<RootPrivateStackParamList, "OrderList">;

type Props = NavigationProps & {
  getOrderList: GetOrderList;
};

export const OrderList = ({
  navigation: { navigate },
  getOrderList,
}: Props) => {
  const theme = useTheme();
  const { filters, removeFilter, clearFilters } = useOrderListFiltersStore();
  const { data, loading, refreshing, page, totalResults, onEndReached, reset } =
    usePaginatedList({
      getFunction: loadOrderList,
      filters,
    });

  async function loadOrderList(
    page: number
  ): Promise<PaginatedListGetFunctionReturn<OrderCardProps>> {
    try {
      const { orderList, totalResults } = await getOrderList.execute({
        page,
        storeId: "28",
        code: filters?.orderCode?.apiValue,
        cpfCnpj: filters?.cpfCnpj?.apiValue,
        customerName: filters?.name?.apiValue,
        createDate: filters?.createdAt?.apiValue,
        status: filters?.status?.apiValue,
      });

      return {
        data: orderList,
        totalResults,
      };
    } catch (error) {
      return {
        data: [],
        totalResults: 0,
      };
    }
  }

  // const goToOrderDeails = () => navigate("OrderDetails");

  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, []);

  return (
    <Container>
      <PaginatedList
        data={data}
        filters={filters}
        handleRemoveFilter={removeFilter}
        onEndReached={onEndReached}
        loading={loading}
        refreshing={refreshing}
        onRefresh={() => reset({ refresh: true })}
        page={page}
        totalResults={totalResults}
        renderItem={({ item }: ListRenderItemInfo<OrderCardProps>) => (
          <OrderCard
            {...item}
            style={{ marginBottom: theme.spacing.lg }}
            // onPress={goToOrderDeails}
          />
        )}
        loaderComponent={
          <OrderCardLoader style={{ marginBottom: theme.spacing.lg }} />
        }
        contentContainerStyle={{
          padding: theme.spacing.lg,
          paddingTop: 0,
        }}
        keyExtractor={(_, index) => String(index)}
      />
    </Container>
  );
};
