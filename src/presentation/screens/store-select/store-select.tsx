import { DrawerActions } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useMemo, useState } from "react";
import { ListRenderItemInfo, Pressable, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { GetStoreList } from "../../../domain/usecases/store/get-store-list";
import { Button } from "../../components/buttons/button/button";
import { StoreCardLoader } from "../../components/cards/store-card/loader/store-card-loader";
import { StoreCard } from "../../components/cards/store-card/store-card";
import { PaginatedList } from "../../components/list/paginated-list/paginated-list";
import {
  usePaginatedList,
  PaginatedListGetFunctionReturn,
} from "../../hooks/use-paginated-list";
import { StoreModel } from "../../models/Store";
import { RootPrivateStackParamList } from "../../routes";
import { mockStore, useUserStore } from "../../store/user";

import { Container, Footer } from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "StoreSelect"
>;

type Props = NavigationProps & {
  getStoreList: GetStoreList;
};

export const StoreSelect = ({
  navigation: { goBack, dispatch },
  getStoreList,
}: Props) => {
  const theme = useTheme();

  const { store, setUserData } = useUserStore();

  const { data, loading, onEndReached, refreshing, reset, totalResults, page } =
    usePaginatedList({
      getFunction: loadStoreList,
    });

  const [selectedStoreId, setSelectedStoreId] = useState(store.id);
  const [loadingStore, setLoadingStore] = useState(false);

  const selectedStore = useMemo(
    () => data.find((item) => item.id === selectedStoreId),
    [selectedStoreId]
  );

  async function loadStoreList(
    page: number
  ): Promise<PaginatedListGetFunctionReturn<StoreModel>> {
    console.log(page);

    try {
      const { storeList, totalResults } = await getStoreList.execute({ page });

      return {
        data: storeList,
        totalResults: totalResults,
      };
    } catch (error) {
      return {
        data: [],
        totalResults: 0,
      };
    }
  }

  const handleSelectStore = (item: StoreModel) => {
    setSelectedStoreId(item.id);
  };

  const handleChangeStore = () => {
    setUserData({ store: selectedStore });
    goBack();
  };

  return (
    <Container>
      <PaginatedList
        data={data}
        loading={loading}
        refreshing={refreshing}
        enableRefresh
        onRefresh={() => reset({ refresh: true })}
        totalResults={totalResults}
        page={page}
        renderItem={({ item }: ListRenderItemInfo<StoreModel>) => {
          const isSelected = item.id === selectedStoreId;

          return (
            <Pressable onPress={() => !isSelected && handleSelectStore(item)}>
              <StoreCard
                {...item}
                style={{ marginVertical: theme.spacing.md }}
                selected={isSelected}
              />
            </Pressable>
          );
        }}
        loaderComponent={
          <>
            <StoreCardLoader style={{ marginVertical: theme.spacing.md }} />
            <StoreCardLoader style={{ marginVertical: theme.spacing.md }} />
          </>
        }
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
        }}
        keyExtractor={(_, index) => String(index)}
        onEndReached={onEndReached}
      />
      <Footer>
        <Button
          text="Selecionar"
          onPress={handleChangeStore}
          loading={loadingStore}
          disabled={selectedStoreId === store.id}
        />
      </Footer>
    </Container>
  );
};
