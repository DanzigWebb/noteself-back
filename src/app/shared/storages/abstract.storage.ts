import { Injectable } from "@angular/core";
import { StorageEnum } from "@shared/storages/storage.enum";

type StorageState = Record<string, any>;

interface AbstractStorageImpl {
  storage: Storage;
  key: string;
  setItem: <T>(key: string, value: T) => void;
  getItem: <T>(key: string) => T | undefined;
  removeItem: (key: string) => void;
  clear: () => void;
}

@Injectable()
export class AbstractStorage implements AbstractStorageImpl {
  key: string = StorageEnum.global;
  state!: StorageState;

  constructor(
    public storage: Storage,
  ) {
    this.init();
  }

  protected init() {
    this.state = this.getLocal();
  }

  setItem<T>(key: string, value: T) {
    this.state[key] = value;
    this.update();
  }

  clear(): void {
    this.state = {};
    this.update();
  }

  getItem<T>(key: string): T | undefined {
    return this.state[key];
  }

  removeItem(key: string): void {
    delete this.state[key];
    this.update();
  }

  protected update() {
    try {
      this.storage.setItem(this.key, JSON.stringify(this.state));
    } catch (e) {
      console.error(e);
    }
  }

  protected getLocal(): StorageState {
    try {
      const storage = this.storage.getItem(this.key);
      return JSON.parse(storage || '{}');
    } catch (e) {
      return {};
    }
  }
}
