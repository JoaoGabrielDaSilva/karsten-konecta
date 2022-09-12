import create from "zustand";
import { Filter } from "../models/filter-model";

export type Filters = {
  orderCode?: Filter;
  cpfCnpj?: Filter;
  name?: Filter;
  createdAt?: Filter;
  status?: Filter;
};

type OrderListFiltersState = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  removeFilter: (params: { key: string }) => void;
  clearFilters: () => void;
};

export const useOrderListFiltersStore = create<OrderListFiltersState>(
  (set) => ({
    filters: null,
    setFilters: (filters) => {
      const newFilters = Object.entries(filters).reduce((acc, item) => {
        if (item[1]) {
          return {
            ...acc,
            [item[0]]: item[1],
          };
        }
        return acc;
      }, {});

      set({ filters: newFilters });
    },
    removeFilter: ({ key }) =>
      set((state) => {
        const newState = { ...state };

        delete newState.filters[key];

        return { filters: { ...newState?.filters } };
      }),
    clearFilters: () => set((state) => ({ ...state, filters: null })),
  })
);
