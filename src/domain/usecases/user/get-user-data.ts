import { MenuListModel, MenuModel } from "../../models/menu-model";

export enum Profile {
  ADM = "ADM",
  LOJA = "LOJA",
  LOJA_ADM = "LOJA_ADM",
  LOJA_MM = "LOJA_MM",
  TECELAGEM = "TECELAGEM",
}

export interface GetUserData {
  execute(): Promise<GetUserData.Model>;
}

export namespace GetUserData {
  export type Model = {
    name: string;
    email: string;
    profileList: Profile[];
    menuList: MenuListModel[];
  };
}
