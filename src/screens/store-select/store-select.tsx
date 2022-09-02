import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { ListRenderItemInfo, Pressable, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { Button } from "../../components/buttons/button/button";
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

const a = (): StoreModel => {
  return {
    ...mockStore(),
    id: String(Math.random() * 1231),
  };
};

const storeDatabase: StoreModel[] = [
  mockStore(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
  a(),
];

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "StoreSelect"
>;

type Props = NavigationProps;

export const StoreSelect = ({ navigation: { goBack } }: Props) => {
  const theme = useTheme();

  const { store } = useUserStore();

  const { data, loading, onEndReached } = usePaginatedList({
    getFunction: getStoreList,
  });

  const [selectedStoreId, setSelectedStoreId] = useState(store.id);
  const [loadingStore, setLoadingStore] = useState(false);

  async function getStoreList(
    page: number
  ): Promise<PaginatedListGetFunctionReturn<StoreModel>> {
    console.log(page);

    try {
      const newData = await new Promise<StoreModel[]>((resolve) => {
        return setTimeout(() => {
          const data = storeDatabase.slice(page * 5, page * 5 + 5);

          resolve(data);
        }, 1000);
      });

      return {
        data: newData,
        totalResults: storeDatabase.length,
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
    setLoadingStore(true);
    setTimeout(() => {
      setLoadingStore(false);
      goBack();
    }, 500);
  };

  return (
    <Container>
      <PaginatedList
        data={data}
        loading={loading}
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
