import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreModel } from "../models/Store";
import { makeAsyncStorageAdapter } from "../../main/factories/cache/local-storage-adapter-factory";
import { setCurrentAccountIdAdapter } from "../../main/adapters/current-account-id-adapter";
import { State } from "react-native-gesture-handler";

type UserState = {
  name: string;
  email: string;
  id: string;
  store: StoreModel;
  setUserId?: (params: { id: string }) => void;
  logoutUser?: () => void;
};

export const mockStore = (): StoreModel => ({
  name: "Loja Cascavel",
  corporateName: "KCM FILIAL 04",
  cnpj: "14164922000149",
  hasAcceptedMembershipTerm: true,
  id: "28",
  isMultiBrand: false,
  adhesionModalityId: "1",
  saleModalityId: "3",
});

const initialState: UserState = {
  name: "Loja Cascavel",
  email: "loja.cascavel@karsten.com.br",
  id: "28",
  store: mockStore(),
};

export const useUserStore = create<UserState>((set) => ({
  ...initialState,
  setUserId: ({ id }) => {
    setCurrentAccountIdAdapter(id);
    set((state) => ({ ...state, id }));
  },
  logoutUser: () => set((state) => ({ ...state, id: null })),
}));
