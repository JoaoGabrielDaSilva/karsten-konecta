import { makeAsyncStorageAdapter } from "../factories/cache/local-storage-adapter-factory";

export const setCurrentAccountIdAdapter = async (id: string): Promise<void> => {
  await makeAsyncStorageAdapter().set("userId", id);
};

export const getCurrentAccountIdAdapter = async (): Promise<string> => {
  return await makeAsyncStorageAdapter().get("userId");
};
