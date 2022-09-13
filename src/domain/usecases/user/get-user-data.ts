export enum Profile {
  ADM = "ADM",
  LOJA = "LOJA",
  LOJA_ADM = "LOJA_ADM",
  LOJA_MM = "LOJA_MM",
  TECELAGEM = "TECELAGEM",
}

export type MenuModel = {
  name: string;
  internalName: string;
};

export interface GetUserData {
  execute(): Promise<GetUserData.Model>;
}

export namespace GetUserData {
  export type Model = {
    name: string;
    email: string;
    profileList: Profile[];
    menuList: {
      section: string;
      data: MenuModel[];
    };
  };
}
