import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootPrivateStackParamList } from "../../routes";
import { Container } from "./styles";
import { PaginatedList } from "../../components/list/paginated-list/paginated-list";
import { ListRenderItemInfo } from "react-native";
import { ListProduct } from "../../components/list/list-product/list-product";
import {
  PaginatedListGetFunctionReturn,
  usePaginatedList,
} from "../../hooks/use-paginated-list";
import { useTheme } from "styled-components/native";
import { SearchNavbar } from "../../components/navigation/search-navbar/search-navbar";
import { RectButton } from "react-native-gesture-handler";
import { ListProductLoader } from "../../components/list/list-product/loader/list-product-loader";
import { GetProductList } from "../../../domain/usecases/product/get-product-list";
import { ProductModel } from "../../../domain/models/product";
import { useForm } from "react-hook-form";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "ProductList"
>;

type Props = NavigationProps & {
  getProductList: GetProductList;
};

type FormValues = {
  search: string;
};

export const ProductList = ({ navigation, getProductList }: Props) => {
  const theme = useTheme();

  const { control, handleSubmit } = useForm();

  let lastSubmittedQuery = "";

  const getProducts = async (
    page: number
  ): Promise<PaginatedListGetFunctionReturn<ProductModel>> => {
    try {
      const { productList, totalResults } = await getProductList.get({
        brandId: "1",
        order: "D",
        page,
        query: lastSubmittedQuery,
        storeId: "28",
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

  const { data, page, loading, onEndReached, reset } =
    usePaginatedList<ProductModel>({
      getFunction: getProducts,
    });

  const onSubmit = ({ search }: FormValues) => {
    lastSubmittedQuery = search;
    reset();
  };

  return (
    <Container>
      <SearchNavbar
        navigation={navigation}
        control={control}
        handleSubmit={handleSubmit(onSubmit)}
      />
      <PaginatedList
        data={data}
        loading={loading}
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
    </Container>
  );
};
