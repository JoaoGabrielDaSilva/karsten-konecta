import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  FlatListProps,
  RefreshControl,
} from "react-native";
import { useTheme } from "styled-components/native";
import { Typography } from "../..";
import { TotalResults, TotalResultsLoader } from "./styles";

type Props = FlatListProps<any> & {
  loading: boolean;
  loaderComponent?: ReactNode;
  page?: number;
  refreshControl?: boolean;
  totalResults?: number;
};

const formatTotalResults = (totalResults: number) => {
  if (!totalResults) return "Nenhum resultado encontrado";

  if (totalResults === 1) return "1 resultado encontrado";

  return `${totalResults} resultados encontrados`;
};

const { width } = Dimensions.get("window");

export const PaginatedList = ({
  loading,

  loaderComponent,
  refreshControl,
  refreshing,
  totalResults,
  page,
  ...props
}: Props) => {
  const theme = useTheme();

  const isFirstLoad = loading && page === 0;

  const showTotalResults =
    totalResults || (totalResults === 0 && (page || page === 0));

  return (
    <FlatList
      {...props}
      onEndReachedThreshold={0.1}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          {showTotalResults ? (
            !isFirstLoad ? (
              <TotalResults>{formatTotalResults(totalResults)}</TotalResults>
            ) : loaderComponent ? (
              <TotalResultsLoader
                variant="dark"
                width={width * 0.4}
                height={15}
              />
            ) : (
              <>
                <TotalResults>Buscando...</TotalResults>

                {loading && !loaderComponent && (
                  <ActivityIndicator color={theme.color.text.primary} />
                )}
              </>
            )
          ) : null}
        </>
      }
      ListFooterComponent={
        <>
          {loading && !loaderComponent && !isFirstLoad && (
            <ActivityIndicator color={theme.color.text.primary} />
          )}
          {loading && loaderComponent && (
            <>
              {isFirstLoad && <>{loaderComponent}</>}
              {loaderComponent}
            </>
          )}
        </>
      }
    />
  );
};
