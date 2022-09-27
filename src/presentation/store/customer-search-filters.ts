import create from "zustand";
import { Filter } from "../models/filter-model";

export type Filters = {
  name?: Filter;
  email?: Filter;
};

type CustomerListFiltersState = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  removeFilter: (params: { key: string }) => void;
  clearFilters: () => void;
};

export const useCustomerListFiltersStore = create<CustomerListFiltersState>(
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

        const hasFilters = Object.values(newState.filters).length > 0;

        return { filters: hasFilters ? { ...newState?.filters } : null };
      }),
    clearFilters: () => set((state) => ({ ...state, filters: null })),
  })
);
