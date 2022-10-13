import { useEffect, useState } from "react";
import { Filter } from "../models/filter-model";

export type PaginatedListGetFunctionReturn<T> = {
  data: T[];
  totalResults: number;
};

export type UsePaginatedListParams<T> = {
  getFunction: (page: number) => Promise<PaginatedListGetFunctionReturn<T>>;
  filters?: {
    [key: string]: Filter;
  };
  disabled?: boolean;
};

type GetDataMiddlewareParams = { reset?: boolean };

type ResetParams = { refresh?: boolean };

export type UsePaginatedListReturn<T> = {
  data: T[];
  page: number;
  loading: boolean;
  refreshing: boolean;
  totalResults: number;
  onEndReached: () => void;
  reset: (params: ResetParams) => void;
};

export const usePaginatedList = <T>({
  getFunction,
  filters,
  disabled,
}: UsePaginatedListParams<T>): UsePaginatedListReturn<T> => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const onEndReached = () =>
    data.length < totalResults && !loading && getDataMiddleware({});

  const reset = ({ refresh }: ResetParams) => {
    setData([]);
    setPage(0);
    setTotalResults(0);
    if (refresh) {
      setRefreshing(true);
    }
  };

  const getDataMiddleware = async ({ reset }: GetDataMiddlewareParams) => {
    try {
      setLoading(true);

      const requestPage = reset ? 0 : page;

      const { data: newData, totalResults: baseTotalResults } =
        await getFunction(requestPage);

      const nextPage = requestPage + 1;

      if (reset) setRefreshing(false);

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
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 0 && !disabled) {
      getDataMiddleware({});
    }
  }, [page, disabled]);

  useEffect(() => {
    if (!isFirstRender) {
      reset({});
    } else {
      setIsFirstRender(false);
    }
  }, [filters]);

  useEffect(() => {
    if (refreshing && !disabled) {
      getDataMiddleware({ reset: true });
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
