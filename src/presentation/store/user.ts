import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreModel } from "../models/Store";

type UserState = {
  name: string;
  email: string;
  id: string;
  store: StoreModel;
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

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
      }),
      { name: "user-storage", getStorage: () => AsyncStorage }
    )
  )
);
