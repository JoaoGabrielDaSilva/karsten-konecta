import React, { ReactNode } from "react";
import { ActivityIndicator, FlatList, FlatListProps } from "react-native";
import { useTheme } from "styled-components/native";

type Props = FlatListProps<any> & {
  loading: boolean;
  loaderComponent?: ReactNode;
  page?: number;
};

export const PaginatedList = ({
  loading,
  loaderComponent,
  ...props
}: Props) => {
  const theme = useTheme();

  const isFirstLoad = loading && props.page === 0;

  return (
    <FlatList
      {...props}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        <>
          {loading && !loaderComponent && (
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
