import React from "react";
import { ActivityIndicator, FlatList, FlatListProps } from "react-native";
import { useTheme } from "styled-components/native";

type Props = FlatListProps<any> & { loading: boolean };

export const PaginatedList = ({ loading, ...props }: Props) => {
  const theme = useTheme();

  return (
    <FlatList
      {...props}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        loading && <ActivityIndicator color={theme.color.text.primary} />
      }
    />
  );
};
