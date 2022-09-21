import { RemoteGetAddressByCep } from "../../../data/usecases/cep/remote-get-address-by-cep";
import { GetAddressByCep } from "../../../domain/usecases/cep/get-address-by-cep";
import { makeAuthorizeHttpClientDecorator } from "../../factories/decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../../factories/http/make-api-url";

export const makeRemoteGetAddressByCep = (): GetAddressByCep =>
  new RemoteGetAddressByCep(
    makeApiUrl("cep", "/get-address"),
    makeAuthorizeHttpClientDecorator()
  );
