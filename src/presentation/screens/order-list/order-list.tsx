import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ListRenderItemInfo } from "react-native";
import { useTheme } from "styled-components/native";
import { GetOrderList } from "../../../domain/usecases/attendance/get-order-list";
import { OrderCardLoader } from "../../components/cards/order-card/loader/order-card-loader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

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
import { useUserStore } from "../../store/user";

import { Container } from "./styles";
import { DuplicateOrder } from "../../../domain/usecases/attendance/duplicate-order";
import { Modal } from "../../components/modal/modal";

type NavigationProps = StackScreenProps<RootPrivateStackParamList, "OrderList">;

type Props = NavigationProps & {
  getOrderList: GetOrderList;
  duplicateOrder: DuplicateOrder;
};

export const OrderList = ({
  navigation: { navigate },
  getOrderList,
  duplicateOrder,
}: Props) => {
  const theme = useTheme();
  const { filters, removeFilter, clearFilters } = useOrderListFiltersStore();
  const { store } = useUserStore();

  const [duplicatingOrder, setDuplicatingOrder] = useState(false);

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
        storeId: store.id,
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
      console.log(error);

      return {
        data: [],
        totalResults: 0,
      };
    }
  }

  const handleDuplicateOrder = async (
    attendanceId: string,
    cpfCnpj: string
  ) => {
    try {
      setDuplicatingOrder(true);
      const { id } = await duplicateOrder.execute({
        storeId: store.id,
        attendanceId,
      });

      setDuplicatingOrder(false);
      navigate("Attendance", {
        id,
      });
    } catch (error) {
      setDuplicatingOrder(false);
      console.log(error.response.data);
    }
  };

  const goToOrderDeails = (orderId: string) =>
    navigate("OrderDetails", {
      attendanceId: orderId,
    });

  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, []);

  return (
    <Container>
      <Modal
        title="Aguarde!"
        text="Aguarde enquanto seu pedido est?? sendo duplicado!"
        visible={duplicatingOrder}
        loading={duplicatingOrder}
      />
      <PaginatedList
        data={data}
        filters={filters}
        handleRemoveFilter={removeFilter}
        onEndReached={onEndReached}
        loading={loading}
        enableRefresh
        refreshing={refreshing}
        onRefresh={() => reset({ refresh: true })}
        page={page}
        totalResults={totalResults}
        renderItem={({ item }: ListRenderItemInfo<OrderCardProps>) => (
          <OrderCard
            {...item}
            style={{ marginBottom: theme.spacing.lg }}
            onPress={goToOrderDeails}
            onIconPress={() => handleDuplicateOrder(item.attendanceId)}
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
