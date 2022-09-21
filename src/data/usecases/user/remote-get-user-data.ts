import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import {
  GetUserData,
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

        const excludedCategories = [
          "Home",
          "Vendas",
          "Catálogo",
          "Minha Conta",
        ];

        const menuOrder = [
          "Gerencial",
          "Operação",
          "Relacionamento Digital",
          "Logística",
          "Treinamento",
          "Configurações",
          "Ajuda",
        ];

        const categories = [];
        const menus = [];

        const { profileList } = result.UsuarioPerfis.reduce(
          (acc, profile) => {
            profile.PerfilMenu.forEach((item) => {
              if (
                item.Sistema !== "APP" ||
                excludedCategories.includes(item.NomeCategoriaPai)
              )
                return;

              if (!categories.includes(item.NomeCategoriaPai))
                return categories.push(item.NomeCategoriaPai);

              if (
                !menus.some(
                  (element) => element.internalName === item.NomeInterno
                )
              ) {
                return menus.push({
                  name: item.NomeMenu,
                  internalName: item.NomeInterno,
                  parentName: item.NomeCategoriaPai,
                });
              }
            }, []);

            return {
              ...acc,
              profileList: [...acc.profileList, profile.NomePerfil],
            };
          },
          {
            profileList: [] as Profile[],
          }
        );
        console.log(categories);
        console.log(menus);

        const menuList = categories
          .reduce((acc, item) => {
            return [
              ...acc,
              {
                title: item,
                data: menus.filter((menu) => menu.parentName === item),
              },
            ];
          }, [])
          .sort(
            (a, b) => menuOrder.indexOf(a.title) - menuOrder.indexOf(b.title)
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
          NomeCategoriaPai: string;
          Sistema: string;
        }[];
      }[];
    };
  };
}
