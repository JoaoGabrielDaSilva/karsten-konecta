import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import {
  GetUserData,
  MenuModel,
  Profile,
} from "../../../domain/usecases/user/get-user-data";
import { HttpClient, HttpStatusCode } from "../../protocols/http/http-client";

export class RemoteGetUserData implements GetUserData {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetUserData.Model>
  ) {}

  async execute(): Promise<GetUserData.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const result = httpResponse.body.Result;

        result.UsuarioPerfis.reduce(
          (acc, profile) => {
            return {
              ...acc,
              profileList: [...acc.profileList, profile.NomePerfil],
            };
          },
          {
            profileList: [] as Profile[],
            menuList: [] as MenuModel[],
          }
        );

        return {
          name: result.Nome,
          email: result.Email,
          profileList,
          menuList,
        };

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetUserData {
  export type Model = {
    Result: {
      Nome: string;
      Email: string;
      UsuarioPerfis: {
        NomePerfil: Profile;
        PerfilMenu: {
          NomeMenu: string;
          NomeInterno: string;
        }[];
      }[];
    };
  };
}
