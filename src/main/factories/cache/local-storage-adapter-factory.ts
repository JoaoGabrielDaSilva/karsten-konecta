import { AsyncStorageAdapter } from "../../../infra/protocols/cache/async-storage-adapter";

export const makeAsyncStorageAdapter = (): AsyncStorageAdapter =>
  new AsyncStorageAdapter();
