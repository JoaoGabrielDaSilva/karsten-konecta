import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreModel } from "../models/Store";
import { makeAsyncStorageAdapter } from "../../main/factories/cache/local-storage-adapter-factory";
import { setCurrentAccountIdAdapter } from "../../main/adapters/current-account-id-adapter";
import { State } from "react-native-gesture-handler";
import { MenuListModel } from "../../domain/models/menu-model";

type UserState = {
  name: string;
  email: string;
  id: string;
  store: StoreModel;
  menuList: MenuListModel[] | null;
  logoutUser?: () => void;
  setUserData?: (params: {
    name?: string;
    email?: string;
    menuList?: MenuListModel[];
  }) => void;
  setUserId?: (params: { id: string }) => void;
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
  name: "",
  email: "",
  id: null,
  store: null,
  menuList: null,
};

export const useUserStore = create<UserState>((set) => ({
  ...initialState,
  setUserData: async (params) => {
    set(params);
  },
  logoutUser: async () => {
    await setCurrentAccountIdAdapter(null);
    await makeAsyncStorageAdapter().set("accessToken", null);
    await makeAsyncStorageAdapter().set("tokenExpireDate", null);

    set((state) => ({ ...state, id: null }));
  },
  setUserId: async ({ id }) => {
    await setCurrentAccountIdAdapter(id);

    set({ id });
  },
}));
