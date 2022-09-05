import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetStorage } from "../../../data/protocols/cache/get-storage";
import { SetStorage } from "../../../data/protocols/cache/set-storage";

export class AsyncStorageAdapter implements GetStorage, SetStorage {
  async get(key: string): Promise<any> {
    return JSON.parse(await AsyncStorage.getItem(key));
  }

  async set(key: string, value: string): Promise<void> {
    if (value) {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } else {
      await AsyncStorage.removeItem(key);
    }
  }
}
