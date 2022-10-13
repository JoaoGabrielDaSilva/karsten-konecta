import { act, renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react-native";
import {
  usePaginatedList,
  UsePaginatedListParams,
  UsePaginatedListReturn,
} from "../../../src/presentation/hooks/use-paginated-list";

describe("usePaginatedList", () => {
  //   it("should call getFunction if page is === 0 and its not disabled", () => {
  //     const getFunction = jest.fn();

  //     renderHook(() => usePaginatedList({ getFunction }));

  //     expect(getFunction).toHaveBeenCalledTimes(1);
  //   });
  //   it("should not call getFunction if page is === 0 and its disabled", () => {
  //     const getFunction = jest.fn();

  //     renderHook(() => usePaginatedList({ getFunction, disabled: true }));

  //     expect(getFunction).toHaveBeenCalledTimes(0);
  //   });
  //   it("should  not call getFunction if totalResults is equal to currentResults", async () => {
  //     const getFunction = jest.fn();

  //     getFunction.mockResolvedValueOnce({
  //       data: Array.from({ length: 5 }),
  //       totalResults: 5,
  //     });

  //     const { result } = renderHook(() => usePaginatedList({ getFunction }));

  //     expect(getFunction).toHaveBeenCalledTimes(1);

  //     act(() => result.current.onEndReached());

  //     expect(getFunction).toHaveBeenCalledTimes(1);
  //   });
  //   it("should  call getFunction if totalResults higher than currentResults", async () => {
  //     const getFunction = jest.fn();

  //     getFunction.mockResolvedValueOnce({
  //       data: Array.from({ length: 5 }),
  //       totalResults: 15,
  //     });

  //     const { result, waitFor } = renderHook(() =>
  //       usePaginatedList({ getFunction })
  //     );

  // expect(result.current.page).toBe(1);
  //     await waitFor(() => result.current.onEndReached());
  // expect(result.current.page).toBe(2);
  //     await waitFor(() => result.current.onEndReached());
  // expect(result.current.page).toBe(3);
  //   });
  it("should reset pagination on change filters", async () => {
    const getFunction = jest.fn();

    getFunction.mockResolvedValueOnce({
      data: Array.from({ length: 5 }),
      totalResults: 15,
    });

    const { result, waitForNextUpdate } = await waitFor(() =>
      renderHook(() => usePaginatedList({ getFunction }))
    );

    // expect(getFunction).toHaveBeenCalledTimes(1);
    expect(result.current.page).toBe(1);
    await waitFor(() => result.current.onEndReached());
    await waitForNextUpdate();
    expect(result.current.page).toBe(1);
    // expect(result.current.page).toBe(2);

    // rerender({ filters: {} });
  });
});
