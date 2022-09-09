import { useEffect, useState } from "react";

export type PaginatedListGetFunctionReturn<T> = {
  data: T[];
  totalResults: number;
};

type UsePaginatedListParams<T> = {
  getFunction: (page: number) => Promise<PaginatedListGetFunctionReturn<T>>;
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
}: UsePaginatedListParams<T>): UsePaginatedListReturn<T> => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const onEndReached = () =>
    data.length < totalResults && !loading && getDataMiddleware({});

  const reset = ({ refresh }: RefreshParams) => {
    setData([]);
    setPage(0);
    setTotalResults(0);
    getDataMiddleware({ refresh });
  };

  const getDataMiddleware = async ({ refresh }: RefreshParams) => {
    setLoading(true);

    const requestPage = refresh ? 0 : page;

    if (refresh) setRefreshing(true);
    console.log(requestPage, data.length, totalResults);

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
    getDataMiddleware({});
  }, []);

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
