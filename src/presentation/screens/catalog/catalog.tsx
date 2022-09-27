import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { useTheme } from "styled-components/native";
import { ProductModel } from "../../../domain/models/product";
import { GetBestSellersProducts } from "../../../domain/usecases/report/get-best-sellers-products";
import { GetRecentProducts } from "../../../domain/usecases/report/get-recent-products";
import { queryClient } from "../../../infra/protocols/cache/query-client";
import { ProductCardLoader } from "../../components/cards/product-card/loader/product-card-loader";
import { ProductCard } from "../../components/cards/product-card/product-card";
import { BottomTab } from "../../components/navigation/bottom-tab/bottom-tab";
import { StackSearchNavbar } from "../../components/navigation/search-navbar/search-navbar";
import { Row } from "../../components/utils";
import { RootPrivateStackParamList } from "../../routes";
import { useUserStore } from "../../store/user";
import { Categories, Container, StyledSectionTitle } from "./styles";
import BedIcon from "../../assets/icons/catalog/bed.svg";
import TableIcon from "../../assets/icons/catalog/table.svg";
import BathIcon from "../../assets/icons/catalog/bath.svg";
import BeachIcon from "../../assets/icons/catalog/beach.svg";
import MenuIcon from "../../assets/icons/catalog/all.svg";
import {
  BottomSheet,
  BottomSheetRef,
} from "../../components/bottom-sheet/bottom-sheet";
import {
  BottomSheetFlatList,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { ListRow } from "../../components/list/list-row/list-row";
import { useProductListFiltersStore } from "../../store/product-list-filters";
import { GetProductCategories } from "../../../domain/usecases/product/get-product-categories";

type Props = StackScreenProps<RootPrivateStackParamList, "Catalog"> & {
  getRecentProducts: GetRecentProducts;
  getBestSellersProducts: GetBestSellersProducts;
  getProductCategories: GetProductCategories;
};

const fixedCategories = [
  {
    icon: BedIcon,
    value: "Cama",
  },
  {
    icon: TableIcon,
    value: "Mesa",
  },
  {
    icon: BathIcon,
    value: "Banho",
  },
  {
    icon: BeachIcon,
    value: "Praia",
  },
];

export const Catalog = ({
  navigation: { setOptions, push },
  getRecentProducts,
  getBestSellersProducts,
  getProductCategories,
}: Props) => {
  const theme = useTheme();
  const { store } = useUserStore();
  const { control } = useForm<{ search: string }>();

  const bottomSheetRef = useRef<BottomSheetRef>();

  const [refreshing, setRefreshing] = useState(false);

  const { filters, setFilters } = useProductListFiltersStore();

  const {
    data: categories,
    isLoading: loadingCategories,
    isRefetching: refreshingCategories,
  } = useQuery(
    "get-product-categories",
    async () => {
      const { categories } = await getProductCategories.execute();

      return categories;
    },
    { staleTime: 1000 * 60 * 60 }
  );

  const {
    data: recentProducts,
    isLoading: loadingRecentProducts,
    isRefetching: refreshingRecentProducts,
    refetch: refetchRecentProducts,
  } = useQuery(
    "get-recent-products",
    async () => {
      const { recentProducts } = await getRecentProducts.execute({
        filter: "LOJA",
        type: "VISTOS",
        storeId: store.id,
      });
      return recentProducts;
    },
    {
      staleTime: 1000 * 10, // 10 seconds
    }
  );

  const {
    data: bestSellers,
    isLoading: loadingBestSellers,
    isRefetching: isRefreshingBestSellers,
    refetch: refetchBestSellers,
  } = useQuery(
    "get-recent-products",
    async () => {
      const { bestSellers } = await getBestSellersProducts.execute({
        filter: "TODOS",
        type: "VENDIDOS",
        storeId: store.id,
      });
      return bestSellers;
    },
    {
      staleTime: 1000 * 60 * 60 * 24, // 10 seconds
    }
  );

  const handleCategoryClick = (category: string) => {
    setFilters({
      category: {
        key: "category",
        label: "Categoria",
        apiValue: category,
        value: category,
      },
    });

    push("ProductList");
  };

  useEffect(() => {
    setOptions({
      header: (props) => (
        <StackSearchNavbar
          {...props}
          control={control}
          backArrow={false}
          onFocus={() => push("ProductList", { defaultFocus: true })}
          drawer
        />
      ),
    });
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetchRecentProducts();
    await refetchBestSellers();
    setRefreshing(false);
  };

  const handlePressProduct = (product: ProductModel) => {
    push("ProductDetails", { code: product.code, ean: product.ean });
  };

  return (
    <Container>
      <Categories align="center" justify="space-between">
        {fixedCategories.map((category) => {
          const Icon = category.icon;

          return (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleCategoryClick(category.value)}
            >
              {<Icon />}
            </TouchableOpacity>
          );
        })}

        {!loadingCategories && !refreshingCategories ? (
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef?.current?.open();
            }}
            activeOpacity={0.5}
          >
            <MenuIcon />
          </TouchableOpacity>
        ) : (
          <ActivityIndicator
            color={theme.color.text.primary}
            style={{ marginHorizontal: theme.spacing.lg }}
          />
        )}
      </Categories>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.color.text.primary}
            colors={[theme.color.text.primary]}
          />
        }
      >
        <StyledSectionTitle>Vistos Recentemente</StyledSectionTitle>
        {!loadingRecentProducts && !refreshingRecentProducts ? (
          <FlatList
            data={recentProducts}
            horizontal
            keyExtractor={(_, index) => String(index)}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard
                onPress={() => handlePressProduct(item)}
                style={{ marginHorizontal: theme.spacing.lg }}
                {...item}
              />
            )}
          />
        ) : (
          <Row>
            <ProductCardLoader style={{ marginHorizontal: theme.spacing.lg }} />
            <ProductCardLoader style={{ marginHorizontal: theme.spacing.lg }} />
          </Row>
        )}

        <StyledSectionTitle>Mais Vendidos</StyledSectionTitle>
        {!loadingBestSellers && !isRefreshingBestSellers ? (
          <FlatList
            data={bestSellers}
            horizontal
            keyExtractor={(item, index) => item.code}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard
                onPress={() => handlePressProduct(item)}
                style={{ marginHorizontal: theme.spacing.lg }}
                {...item}
              />
            )}
          />
        ) : (
          <Row>
            <ProductCardLoader style={{ marginHorizontal: theme.spacing.lg }} />
            <ProductCardLoader style={{ marginHorizontal: theme.spacing.lg }} />
          </Row>
        )}
      </ScrollView>
      <BottomTab />
      <BottomSheet
        ref={bottomSheetRef}
        onClose={() => {
          bottomSheetRef?.current?.close();
        }}
        snapPoints={["90%"]}
        enableOverDrag={false}
      >
        <BottomSheetFlatList
          data={categories}
          contentContainerStyle={{
            marginHorizontal: theme.spacing.lg,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.5}>
              <ListRow
                label={String(item.value)}
                onPress={() => {
                  handleCategoryClick(item.value);
                  bottomSheetRef?.current?.close();
                }}
              />
            </TouchableOpacity>
          )}
        />
      </BottomSheet>
    </Container>
  );
};
