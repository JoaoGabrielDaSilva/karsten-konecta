import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
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

  const { data, loading, page, onEndReached, totalResults, reset, refreshing } =
    usePaginatedList({
      getFunction: loadAttendanceList,
    });

  async function loadAttendanceList(
    page: number
  ): Promise<PaginatedListGetFunctionReturn<AttendanceCardProps>> {
    try {
      const { attendanceList, totalResults } = await getAttendanceList.execute({
        page,
        storeId: "28",
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

  const handleContinueAttendance = () => navigate("Attendance");

  return (
    <Container>
      <PaginatedList
        data={data}
        onEndReached={onEndReached}
        loading={loading}
        refreshing={refreshing}
        totalResults={totalResults}
        onRefresh={() => reset({ refresh: true })}
        renderItem={({ item }: ListRenderItemInfo<AttendanceCardProps>) => (
          <AttendanceCard
            {...item}
            onButtonPress={handleContinueAttendance}
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
