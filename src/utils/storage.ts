import { MMKV } from 'react-native-mmkv';

interface GenericStorageInterface {
  getBoolean: (key: string) => boolean | undefined;
  getString: (key: string) => string | undefined;
  set: (key: string, value: any) => void;
}

interface StorageInterface {
  getBoolean: (key: string) => Promise<boolean> | boolean;
  getString: (key: string) => Promise<string> | string;
  set: (key: string, value: any) => Promise<void> | void;
}

class Storage implements StorageInterface {
  private storageInstance: GenericStorageInterface;

  constructor(storage: GenericStorageInterface) {
    this.storageInstance = storage;
  }

  async getBoolean(key: string): Promise<boolean> {
    return this.storageInstance?.getBoolean(key) || false;
  }

  async getString(key: string): Promise<string> {
    return this.storageInstance?.getString(key) || '';
  }

  async set(key: string, value: any): Promise<void> {
    this.storageInstance?.set(key, value);
  }
}

export const storage = new Storage(new MMKV());

export { Storage };
export type { StorageInterface, GenericStorageInterface };
