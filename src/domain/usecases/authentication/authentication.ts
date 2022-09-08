import { AuthModel } from "../../models/auth-model";

export interface Authentication {
  auth(params: Authentication.Params): Promise<Authentication.Model>;
}

export namespace Authentication {
  export type Params = {
    login: string;
    password: string;
  };

  export type Model = AuthModel;
}
