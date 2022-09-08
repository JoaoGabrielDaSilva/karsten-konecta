import { Authentication } from "../../domain/usecases/authentication/authentication";
import { makeAsyncStorageAdapter } from "../factories/cache/local-storage-adapter-factory";

type lastLoggedInAccount = Authentication.Params & {
  rememberMe: boolean;
};

export const setLastLoggedInAccountAdapter = async (
  data: lastLoggedInAccount
): Promise<void> => {
  await makeAsyncStorageAdapter().set("lastLoggedInAccount", data);
};

export const getLastLoggedInAccountAdapter =
  async (): Promise<lastLoggedInAccount> => {
    return await makeAsyncStorageAdapter().get("lastLoggedInAccount");
  };
