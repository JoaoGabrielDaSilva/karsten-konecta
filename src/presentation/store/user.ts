import create from "zustand";
import { persist } from "zustand/middleware";
import { StoreModel } from "../models/Store";
import { makeAsyncStorageAdapter } from "../../main/factories/cache/local-storage-adapter-factory";
import { setCurrentAccountIdAdapter } from "../../main/adapters/current-account-id-adapter";
import { MenuListModel } from "../../domain/models/menu-model";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserState = {
  name: string;
  email: string;
  id: string;
  logged: boolean;
  menuList: MenuListModel[] | null;
  logoutUser?: () => void;
  setUserData?: (params: {
    name?: string;
    email?: string;
    menuList?: MenuListModel[];
    store?: StoreModel;
    logged?: boolean;
  }) => void;
  store: StoreModel;
  setUserId?: (params: { id: string }) => void;
};

const initialState: UserState = {
  name: "",
  email: "",
  id: null,
  store: null,
  menuList: [],
  logged: false,
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      ...initialState,
      setUserData: async (params) => {
        set(params);
      },
      logoutUser: async () => {
        await setCurrentAccountIdAdapter(null);
        await makeAsyncStorageAdapter().set("accessToken", null);
        await makeAsyncStorageAdapter().set("tokenExpireDate", null);

        set({ ...initialState });
      },
      setUserId: async ({ id }) => {
        await setCurrentAccountIdAdapter(id);

        set({ id });
      },
    }),
    {
      name: "user-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
