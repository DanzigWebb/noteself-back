import { AbstractStorage } from "@shared/storages/abstract.storage";
import { inject, Injectable, InjectionToken } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { StorageEnum } from "@shared/storages/storage.enum";

@Injectable()
export class UserStorage extends AbstractStorage {
  key: string = StorageEnum.user;

  constructor(public storage: Storage) {
    super(storage);
    super.init();
  }
}

export const USER_STORAGE = new InjectionToken<UserStorage>('user storage', {
  providedIn: 'root',
  factory: (): UserStorage => {
    const doc = inject(DOCUMENT);
    return new UserStorage(doc.defaultView!.localStorage);
  },
});
