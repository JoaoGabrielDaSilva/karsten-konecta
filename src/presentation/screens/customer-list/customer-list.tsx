import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ListRenderItemInfo } from "react-native";
import { RootPrivateStackParamList } from "../../routes";
import { Container } from "./styles";

import { useCustomerListFiltersStore } from "../../store/customer-search-filters";
import { GetActionCustomerList } from "../../../domain/usecases/action/get-action-customer-list";
import {
  PaginatedListGetFunctionReturn,
  usePaginatedList,
} from "../../hooks/use-paginated-list";
import { useUserStore } from "../../store/user";
import { PaginatedList } from "../../components/list/paginated-list/paginated-list";
import { Typography } from "../../components/utils";
import { useTheme } from "styled-components/native";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "CustomerList"
>;

type Props = NavigationProps & {
  getCustomerList: GetActionCustomerList;
};

export const CustomerList = ({
  navigation: { navigate },
  getCustomerList,
}: Props) => {
  const { store } = useUserStore();
  const { filters, clearFilters, removeFilter } = useCustomerListFiltersStore();
  const theme = useTheme();
  const { data, loading, onEndReached, page, refreshing, reset, totalResults } =
    usePaginatedList({
      filters,
      getFunction: loadCustomerList,
    });

  async function loadCustomerList(
    page: number
  ): Promise<
    PaginatedListGetFunctionReturn<GetActionCustomerList.CustomerListItem>
  > {
    try {
      const { customerList, totalResults } = await getCustomerList.execute({
        name: filters?.name?.apiValue,
        email: filters?.email?.apiValue,
        page,
        storeId: store.id,
      });

      return {
        data: customerList,
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

  useEffect(() => {
    return () => clearFilters();
  }, []);

  return (
    <Container>
      <PaginatedList
        data={data}
        totalResults={totalResults}
        loading={loading}
        enableRefresh
        page={page}
        handleRemoveFilter={removeFilter}
        onEndReached={onEndReached}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
        }}
        onRefresh={() => reset({ refresh: true })}
        renderItem={({
          item,
        }: ListRenderItemInfo<GetActionCustomerList.CustomerListItem>) => (
          <Typography>{item.name}</Typography>
        )}
      />
    </Container>
  );
};
