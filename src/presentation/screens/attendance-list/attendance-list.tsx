import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ListRenderItemInfo } from "react-native";
import { useTheme } from "styled-components/native";
import { GetAttendanceList } from "../../../domain/usecases/attendance/get-attendance-list";
import {
  AttendanceCard,
  AttendanceCardProps,
} from "../../components/cards/attendance-card/attendance-card";
import { AttendanceCardLoader } from "../../components/cards/attendance-card/loader/attendance-card-loader";
import { PaginatedList } from "../../components/list/paginated-list/paginated-list";

import {
  PaginatedListGetFunctionReturn,
  usePaginatedList,
} from "../../hooks/use-paginated-list";
import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceListFiltersStore } from "../../store/attendance-list-filters";
import { useUserStore } from "../../store/user";
import { Container } from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "AttendanceList"
>;

type Props = NavigationProps & {
  getAttendanceList: GetAttendanceList;
};

export const AttendanceList = ({
  navigation: { navigate },
  getAttendanceList,
}: Props) => {
  const theme = useTheme();
  const { filters, clearFilters, removeFilter } =
    useAttendanceListFiltersStore();
  const { store } = useUserStore();

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

  const handleContinueAttendance = (params: { cpfCnpj: string; id: string }) =>
    navigate("Attendance", params);

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
          <AttendanceCard
            {...item}
            onButtonPress={() =>
              handleContinueAttendance({ id: item.id, cpfCnpj: item.cpfCnpj })
            }
            style={{ marginBottom: theme.spacing.lg }}
          />
        )}
        loaderComponent={
          <AttendanceCardLoader style={{ marginBottom: theme.spacing.lg }} />
        }
        contentContainerStyle={{
          padding: theme.spacing.lg,
          paddingTop: 0,
        }}
        page={page}
        keyExtractor={(_, index) => String(index)}
      />
    </Container>
  );
};
