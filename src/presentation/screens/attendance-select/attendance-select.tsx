import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ListRenderItemInfo } from "react-native";
import { useTheme } from "styled-components/native";
import { AddProduct } from "../../../domain/usecases/attendance/add-product";
import { GetAttendance } from "../../../domain/usecases/attendance/get-attendance";
import { GetAttendanceList } from "../../../domain/usecases/attendance/get-attendance-list";
import { Button } from "../../components/buttons/button/button";
import { AttendanceCardProps } from "../../components/cards/attendance-card/attendance-card";
import { AttendanceSelectCard } from "../../components/cards/attendance-select-card/attendance-select-card";
import { AttendanceSelectCardLoader } from "../../components/cards/attendance-select-card/loader/attendance-select-card-loader";
import { PaginatedList } from "../../components/list/paginated-list/paginated-list";

import {
  PaginatedListGetFunctionReturn,
  usePaginatedList,
} from "../../hooks/use-paginated-list";
import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import { useAttendanceListFiltersStore } from "../../store/attendance-list-filters";
import { useUserStore } from "../../store/user";
import { Container, Footer } from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "AttendanceSelect"
>;

type Props = NavigationProps & {
  getAttendanceList: GetAttendanceList;
  addProduct: AddProduct;
  getAttendance: GetAttendance;
};

export const AttendanceSelect = ({
  navigation: { navigate },
  route,
  getAttendanceList,
  addProduct,
  getAttendance,
}: Props) => {
  const { product } = route.params;

  const theme = useTheme();
  const { filters, clearFilters, removeFilter } =
    useAttendanceListFiltersStore();
  const { store } = useUserStore();
  const { setAttendance } = useAttendanceStore();

  const [addingProduct, setAddingProduct] = useState(false);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);

  const { data, loading, page, onEndReached, totalResults, reset, refreshing } =
    usePaginatedList({
      getFunction: loadAttendanceList,
      filters,
    });

  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, []);

  async function loadAttendanceList(
    page: number
  ): Promise<PaginatedListGetFunctionReturn<AttendanceCardProps>> {
    try {
      const { attendanceList, totalResults } = await getAttendanceList.execute({
        page,
        storeId: store.id,
        name: filters?.name?.apiValue,
        cpfCnpj: filters?.cpfCnpj?.apiValue,
        initialDate: filters?.initialDate?.apiValue,
        endDate: filters?.endDate?.apiValue,
      });

      return {
        data: attendanceList,
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

  const handleAddProduct = async () => {
    try {
      setAddingProduct(true);
      await addProduct.add({
        amount: product.amount,
        attendanceId: selectedAttendanceId,
        productId: product.code,
        storeId: store.id,
      });

      const attendance = await getAttendance.get({
        id: selectedAttendanceId,
        storeId: store.id,
      });

      setAttendance({ ...attendance });

      setAddingProduct(false);

      navigate("Attendance");
    } catch (error) {
      setAddingProduct(false);

      console.log(error);
    }
  };

  return (
    <Container>
      <PaginatedList
        data={data}
        filters={filters}
        handleRemoveFilter={({ key }) => removeFilter({ key })}
        onEndReached={onEndReached}
        loading={loading}
        enableRefresh
        refreshing={refreshing}
        totalResults={totalResults}
        onRefresh={() => reset({ refresh: true })}
        renderItem={({ item }: ListRenderItemInfo<AttendanceCardProps>) => (
          <AttendanceSelectCard
            {...item}
            selected={item.id === selectedAttendanceId}
            onPress={({ attendanceId }) =>
              setSelectedAttendanceId(attendanceId)
            }
            style={{ marginBottom: theme.spacing.lg }}
          />
        )}
        loaderComponent={
          <AttendanceSelectCardLoader
            style={{ marginBottom: theme.spacing.lg }}
          />
        }
        contentContainerStyle={{
          padding: theme.spacing.lg,
          paddingTop: 0,
        }}
        page={page}
        keyExtractor={(_, index) => String(index)}
      />
      <Footer>
        <Button
          text="Adicionar ao carrinho"
          onPress={handleAddProduct}
          disabled={loading || !selectedAttendanceId}
          loading={addingProduct}
        />
      </Footer>
    </Container>
  );
};
