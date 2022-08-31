import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootPrivateStackParamList } from "../../routes";
import { Container } from "./styles";
import { PaginatedList } from "../../components/list/paginated-list/paginated-list";
import { ListRenderItemInfo } from "react-native";
import { ProductModel } from "../../models/Product";
import { ListProduct } from "../../components/list/list-product/list-product";
import {
  PaginatedListGetFunctionReturn,
  usePaginatedList,
} from "../../hooks/use-paginated-list";
import { Theme } from "../../constants/enums/Theme";
import { useTheme } from "styled-components/native";
import { SearchNavbar } from "../../components/navigation/search-navbar/search-navbar";
import { useForm } from "react-hook-form";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "ProductList"
>;

type Props = NavigationProps;

const baseData: ProductModel[] = [
  {
    name: "Toalha Banhão Karsten Fio Penteado Max Lumina Preto/ Cinza",
    code: "1234",
    uri: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSywiJfzb6kSAJ5wgeUX2xN4N_zIUOrOJLkPMY_NTmhMSe74nnJjawHlhqVHFnJxQBcSocfoXEiUSc&usqp=CAc",
    ean: "17559272547197",
  },
  {
    name: "Toalha Banhão Karsten Fio Penteado Max Lumina Preto/ Cinza",
    code: "5678",
    uri: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSywiJfzb6kSAJ5wgeUX2xN4N_zIUOrOJLkPMY_NTmhMSe74nnJjawHlhqVHFnJxQBcSocfoXEiUSc&usqp=CAc",
    ean: "17559272547197",
  },
  {
    name: "Toalha Banhão Karsten Fio Penteado Max Lumina Preto/ Cinza",
    code: "9101",
    uri: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSywiJfzb6kSAJ5wgeUX2xN4N_zIUOrOJLkPMY_NTmhMSe74nnJjawHlhqVHFnJxQBcSocfoXEiUSc&usqp=CAc",
    ean: "17559272547197",
  },
  {
    name: "Toalha Banhão Karsten Fio Penteado Max Lumina Preto/ Cinza",
    code: "1213",
    uri: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSywiJfzb6kSAJ5wgeUX2xN4N_zIUOrOJLkPMY_NTmhMSe74nnJjawHlhqVHFnJxQBcSocfoXEiUSc&usqp=CAc",
    ean: "17559272547197",
  },
  {
    name: "Toalha Banhão Karsten Fio Penteado Max Lumina Preto/ Cinza",
    code: "1213",
    uri: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSywiJfzb6kSAJ5wgeUX2xN4N_zIUOrOJLkPMY_NTmhMSe74nnJjawHlhqVHFnJxQBcSocfoXEiUSc&usqp=CAc",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "1234",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "5678",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "9101",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "1213",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "1213",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "5678",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "9101",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "1213",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "1213",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "5678",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "9101",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "1213",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "1213",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "5678",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "9101",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "1213",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
  {
    name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
    code: "1213",
    uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
    ean: "17559272547197",
  },
];

export const ProductList = ({ navigation }: Props) => {
  const theme = useTheme();

  const [database, setDatabase] = useState(baseData);

  const getProducts = async (
    page: number
  ): Promise<PaginatedListGetFunctionReturn<ProductModel>> => {
    const nextPageData = database.slice(page * 5, page * 5 + 5);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: nextPageData,
          totalResults: database.length,
        });
      }, 500);
    });
  };

  const { data, loading, onEndReached } = usePaginatedList<ProductModel>({
    getFunction: getProducts,
  });

  return (
    <Container>
      <SearchNavbar navigation={navigation} />
      <PaginatedList
        data={data}
        loading={loading}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
        }}
        onEndReached={onEndReached}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }: ListRenderItemInfo<ProductModel>) => (
          <ListProduct {...item} />
        )}
      />
    </Container>
  );
};
