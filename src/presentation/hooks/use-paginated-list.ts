import { useEffect, useState } from "react";

export type PaginatedListGetFunctionReturn<T> = {
  data: T[];
  totalResults: number;
};

type UsePaginatedListParams<T> = {
  getFunction: (page: number) => Promise<PaginatedListGetFunctionReturn<T>>;
};

type UsePaginatedListReturn<T> = {
  data: T[];
  page: number;
  loading: boolean;
  totalResults: number;
  onEndReached: () => void;
  reset: () => void;
};

export const usePaginatedList = <T>({
  getFunction,
}: UsePaginatedListParams<T>): UsePaginatedListReturn<T> => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const onEndReached = () =>
    data.length < totalResults && !loading && getDataMiddleware();

  const reset = () => {
    setData([]);
    setPage(0);
    setTotalResults(0);
    getDataMiddleware();
  };

  const getDataMiddleware = async () => {
    setLoading(true);
    console.log(page, data.length, totalResults);

    const { data: newData, totalResults: baseTotalResults } = await getFunction(
      page
    );

    const nextPage = page + 1;

    if (page === 0) {
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
    getDataMiddleware();
  }, []);

  return {
    data,
    page,
    loading,
    onEndReached,
    totalResults,
    reset,
  };
};
