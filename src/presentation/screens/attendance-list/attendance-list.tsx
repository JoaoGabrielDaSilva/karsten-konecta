import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { ListRenderItemInfo } from "react-native";
import { useTheme } from "styled-components/native";
import {
  AttendanceCard,
  AttendanceCardProps,
} from "../../components/cards/attendance-card/attendance-card";

import { PaginatedList } from "../../components/list/paginated-list/paginated-list";
import {
  PaginatedListGetFunctionReturn,
  usePaginatedList,
} from "../../hooks/use-paginated-list";
import { RootPrivateStackParamList } from "../../routes";
import { Container } from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "AttendanceList"
>;

type Props = NavigationProps;

const attendanceDatabase: AttendanceCardProps[] = [
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 555,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
  {
    name: "João",
    cpfCnpj: "02526108063",
    createdAt: new Date(),
    lastAddedProduct: {
      name: "Jogo de Banho Karsten Fio Penteado 5 Peças Lumina Cinza/ Preto",
      code: "1213",
      uri: "https://karsten.vtexassets.com/arquivos/ids/171435/3592279_01.jpg?v=637260039902170000",
      ean: "17559272547197",
      amount: 5,
    },
    totalProductsInCart: "5",
  },
];

export const AttendanceList = ({ navigation: { navigate } }: Props) => {
  const theme = useTheme();
  const { data, loading, onEndReached } = usePaginatedList({
    getFunction: getAttendanceList,
  });

  async function getAttendanceList(
    page: number
  ): Promise<PaginatedListGetFunctionReturn<AttendanceCardProps>> {
    try {
      const newData = await new Promise<AttendanceCardProps[]>((resolve) =>
        setTimeout(() => {
          const data = attendanceDatabase.slice(page * 5, page * 5 + 5);

          resolve(data);
        }, 1000)
      );

      return {
        data: newData,
        totalResults: attendanceDatabase.length,
      };
    } catch (error) {
      return {
        data: [],
        totalResults: 0,
      };
    }
  }

  const handleContinueAttendance = () => navigate("Attendance");

  return (
    <Container>
      <PaginatedList
        data={data}
        onEndReached={onEndReached}
        loading={loading}
        renderItem={({ item }: ListRenderItemInfo<AttendanceCardProps>) => (
          <AttendanceCard
            {...item}
            style={{ margin: theme.spacing.md }}
            onButtonPress={handleContinueAttendance}
          />
        )}
        contentContainerStyle={{
          paddingBottom: theme.spacing.xxl,
        }}
        keyExtractor={(_, index) => String(index)}
      />
    </Container>
  );
};
