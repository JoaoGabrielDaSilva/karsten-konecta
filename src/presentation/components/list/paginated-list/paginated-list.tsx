import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  FlatListProps,
  RefreshControl,
  View,
} from "react-native";
import { useTheme } from "styled-components/native";
import { Filter } from "../../../models/filter-model";
import { StyledFilterTag, TotalResults, TotalResultsLoader } from "./styles";

export type PaginatedListProps = FlatListProps<any> & {
  loading?: boolean;
  loaderComponent?: ReactNode;
  page?: number;
  enableRefresh?: boolean;
  totalResults?: number;
  filters?: {
    [key: string]: Filter;
  };
  handleRemoveFilter?: (params: { key: string }) => void;
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
  enableRefresh,
  page,
  filters,
  handleRemoveFilter,
  ListHeaderComponent,
  testID,
  onRefresh,
  ...props
}: PaginatedListProps) => {
  const theme = useTheme();

  const showTotalResults = totalResults !== undefined;
  const isFirstLoad = loading && page === 0;

  return (
    <FlatList
      {...props}
      testID={testID}
      onEndReachedThreshold={0.1}
      refreshing={refreshing}
      refreshControl={
        enableRefresh && (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="black"
            colors={["black"]}
          />
        )
      }
      ListHeaderComponent={
        <>
          {ListHeaderComponent && ListHeaderComponent}
          {filters && (
            <FlatList
              testID={`${testID}-filters`}
              data={Object.values(filters)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item: Filter) => String(item.filterKey)}
              renderItem={({ item }) => (
                <StyledFilterTag
                  {...item}
                  handleRemove={() =>
                    handleRemoveFilter &&
                    handleRemoveFilter({ key: item.filterKey })
                  }
                />
              )}
            />
          )}
          {showTotalResults ? (
            !isFirstLoad || page === undefined ? (
              <TotalResults>{formatTotalResults(totalResults)}</TotalResults>
            ) : (
              loaderComponent && (
                <TotalResultsLoader
                  testID={`${testID}-total-results-loader`}
                  variant="dark"
                  width={width * 0.4}
                  height={15}
                />
              )
            )
          ) : null}

          {isFirstLoad && !loaderComponent && (
            <>
              <TotalResults>Buscando...</TotalResults>
              {!refreshing && (
                <ActivityIndicator color={theme.color.text.primary} />
              )}
            </>
          )}
        </>
      }
      ListFooterComponent={
        <>
          {!refreshing && loading && !loaderComponent && !isFirstLoad && (
            <ActivityIndicator
              testID={`${testID}-bottom-loader`}
              color={theme.color.text.primary}
            />
          )}
          {loading && loaderComponent && (
            <View testID={`${testID}-bottom-loader-container`}>
              {isFirstLoad && <>{loaderComponent}</>}
              {loaderComponent}
            </View>
          )}
        </>
      }
    />
  );
};
