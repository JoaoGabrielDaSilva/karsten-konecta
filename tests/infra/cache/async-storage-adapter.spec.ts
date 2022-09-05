import { faker } from "@faker-js/faker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageAdapter } from "../../../src/infra/protocols/cache/async-storage-adapter";

const makeSut = (): AsyncStorageAdapter => new AsyncStorageAdapter();

describe("AsyncStorageAdapter", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });
  test("Should call AsyncStorage.setItem with correct values", async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.word();

    await sut.set(key, value);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });

  test("Should call AsyncStorage.removeItem if value is null", async () => {
    const sut = makeSut();
    const key = faker.database.column();

    await sut.set(key, undefined);

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it("should call AsyncStorage.getItem with correct values", async () => {
    const sut = makeSut();

    const key = faker.database.column();
    const value = faker.random.word();

    const getItemSpy = jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValueOnce(JSON.stringify(value));

    const obj = await sut.get(key);

    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
