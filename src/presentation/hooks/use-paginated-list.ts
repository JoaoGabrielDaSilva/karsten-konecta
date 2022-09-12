import { useEffect, useState } from "react";
import { Filter } from "../models/filter-model";

export type PaginatedListGetFunctionReturn<T> = {
  data: T[];
  totalResults: number;
};

type UsePaginatedListParams<T> = {
  getFunction: (page: number) => Promise<PaginatedListGetFunctionReturn<T>>;
  filters?: {
    [key: string]: Filter;
  };
};

type RefreshParams = { refresh?: boolean };

type UsePaginatedListReturn<T> = {
  data: T[];
  page: number;
  loading: boolean;
  refreshing: boolean;
  totalResults: number;
  onEndReached: () => void;

  reset: (params?: RefreshParams) => void;
};

export const usePaginatedList = <T>({
  getFunction,
  filters,
}: UsePaginatedListParams<T>): UsePaginatedListReturn<T> => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const onEndReached = () =>
    data.length < totalResults && !loading && getDataMiddleware({});

  const reset = ({ refresh }: RefreshParams) => {
    setData([]);
    setPage(0);
    setTotalResults(0);
    if (refresh) {
      setRefreshing(true);
    }
  };

  const getDataMiddleware = async ({ refresh }: RefreshParams) => {
    setLoading(true);

    const requestPage = refresh ? 0 : page;

    const { data: newData, totalResults: baseTotalResults } = await getFunction(
      requestPage
    );

    const nextPage = requestPage + 1;

    if (refresh) setRefreshing(false);

    if (requestPage === 0) {
      setTotalResults(baseTotalResults);
      setData(newData);
      setPage(nextPage);
      setLoading(false);
      return;
    }
    setData((data) => [...data, ...newData]);

    setPage(nextPage);
    setLoading(false);
  };

  useEffect(() => {
    if (page === 0) {
      getDataMiddleware({});
    }
  }, [page]);

  console.log(filters);

  useEffect(() => {
    console.log("CHAMOOOOOOOOOOOOOOOOOOOOU");

    if (!isFirstRender) {
      console.log("ATUALIZOUUUUU");
      reset({});
    } else {
      setIsFirstRender(false);
    }
  }, [filters]);

  useEffect(() => {
    if (refreshing) {
      getDataMiddleware({ refresh: true });
    }
  }, [refreshing]);

  return {
    data,
    page,
    loading,
    onEndReached,
    totalResults,
    reset,
    refreshing,
  };
};
