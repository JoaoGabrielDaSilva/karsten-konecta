import React, { useEffect, useRef, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootPrivateStackParamList } from "../../routes";
import { Container, HistoryItem, NoResultsFound } from "./styles";
import { PaginatedList } from "../../components/list/paginated-list/paginated-list";
import { FlatList, Keyboard, ListRenderItemInfo } from "react-native";
import { ListProduct } from "../../components/list/list-product/list-product";
import {
  PaginatedListGetFunctionReturn,
  usePaginatedList,
} from "../../hooks/use-paginated-list";
import { useTheme } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { ListProductLoader } from "../../components/list/list-product/loader/list-product-loader";
import { GetProductList } from "../../../domain/usecases/product/get-product-list";
import { ProductModel } from "../../../domain/models/product";
import { useForm } from "react-hook-form";
import { StackSearchNavbar } from "../../components/navigation/search-navbar/search-navbar";
import { ListRow } from "../../components/list/list-row/list-row";
import { ListRowLoader } from "../../components/list/list-row/loader/list-row-loader";
import { GetSearchHistory } from "../../../domain/usecases/product/get-search-history";
import { useUserStore } from "../../store/user";
import { Typography } from "../../components/utils";
import { useProductListFiltersStore } from "../../store/product-list-filters";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "ProductList"
>;

type Props = NavigationProps & {
  getProductList: GetProductList;
  getSearchHistory: GetSearchHistory;
};

type FormValues = {
  search: string;
};

export const ProductList = ({
  getProductList,
  getSearchHistory,
  navigation,
  route,
}: Props) => {
  const theme = useTheme();
  const { store } = useUserStore();
  const { filters, setFilters, removeFilter, clearFilters } =
    useProductListFiltersStore();

  const { defaultFocus } = route.params;

  const [loadingSearchHistory, setLoadingSearchHistory] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const [inputIsFocused, setInputIsFocused] = useState(defaultFocus);

  const { control, handleSubmit, setValue } = useForm<FormValues>();

  const getProducts = async (
    page: number
  ): Promise<PaginatedListGetFunctionReturn<ProductModel>> => {
    try {
      const { productList, totalResults } = await getProductList.get({
        page,
        storeId: store.id,
        brandId: filters?.brand?.apiValue,
        order: filters?.ordination?.apiValue,
        query: filters?.query?.apiValue,
        category: filters?.category?.apiValue,
      });

      return {
        data: productList,
        totalResults,
      };
    } catch (error) {
      console.log(error);
      return {
        data: [],
        totalResults: 0,
      };
    }
  };

  const { data, page, loading, onEndReached, reset, refreshing, totalResults } =
    usePaginatedList<ProductModel>({
      getFunction: getProducts,
      filters,
      disabled: !filters,
    });

  const onSubmit = ({ search }: FormValues) => {
    try {
      Keyboard.dismiss();
      console.log("search", search);

      if (!search) return;

      setFilters({
        ...filters,
        query: {
          label: "Busca",
          apiValue: search,
          value: search,
          hideRemove: true,
          key: "query",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadSearchHistory = async () => {
    try {
      const { searchHistory } = await getSearchHistory.execute({
        storeId: store.id,
        type: "R",
      });

      setSearchHistory(searchHistory);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSearchHistory(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <StackSearchNavbar
          control={control}
          handleSubmit={() => handleSubmit(onSubmit)()}
          defaultFocus={defaultFocus}
          onFocus={() => setInputIsFocused(true)}
          onBlur={() => setInputIsFocused(false)}
          rightIcon="filter-outline"
          onRightIconPress={() => navigation.navigate("ProductListFilters")}
          {...props}
        />
      ),
    });

    setFilters({
      ...filters,
      ordination: {
        label: "Ordenação",
        apiValue: "D",
        value: "Alfabética",
        key: "ordination",
        hideRemove: true,
      },
    });

    loadSearchHistory();

    return () => {
      clearFilters();
    };
  }, []);

  return (
    <Container>
      {filters && Object.keys(filters).length > 1 && !inputIsFocused ? (
        <PaginatedList
          data={data}
          loading={loading}
          filters={filters}
          enableRefresh
          handleRemoveFilter={removeFilter}
          onRefresh={() => reset({ refresh: true })}
          refreshing={refreshing}
          totalResults={totalResults}
          onEndReached={onEndReached}
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.lg,
          }}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }: ListRenderItemInfo<ProductModel>) => (
            <RectButton
              onPress={() =>
                navigation.push("ProductDetails", {
                  code: item.code,
                  ean: item.ean,
                })
              }
            >
              <ListProduct {...item} />
            </RectButton>
          )}
          page={page}
          loaderComponent={
            <>
              <ListProductLoader />
              <ListProductLoader />
            </>
          }
        />
      ) : (
        <>
          {!loadingSearchHistory ? (
            <FlatList
              keyboardShouldPersistTaps="always"
              data={searchHistory}
              contentContainerStyle={{
                paddingHorizontal: theme.spacing.lg,
              }}
              ListEmptyComponent={
                <NoResultsFound>Nenhuma busca recente</NoResultsFound>
              }
              keyExtractor={(_, index) => String(index)}
              renderItem={({ item }) => (
                <HistoryItem
                  leftIcon="refresh"
                  label={item.label}
                  onPress={() => {
                    setValue("search", item.label);
                    handleSubmit(onSubmit)();
                  }}
                />
              )}
            />
          ) : (
            <>
              <ListRowLoader leftIcon value={false} />
              <ListRowLoader leftIcon value={false} />
              <ListRowLoader leftIcon value={false} />
            </>
          )}
        </>
      )}
    </Container>
  );
};
