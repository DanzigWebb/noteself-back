import { AbstractStorage } from "@shared/storages/abstract.storage";
import { inject, Injectable, InjectionToken } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { StorageEnum } from "@shared/storages/storage.enum";
import { UserDto } from "@models/user";
import { getObjectKeysAsKeyof } from "@utils/common";


@Injectable()
export class UserStorage extends AbstractStorage {
  key: string = StorageEnum.user;

  get token(): string | undefined {
    return this.state.accessToken;
  }

  constructor(public storage: Storage) {
    super(storage);
    super.init();
  }

  setUser(user: UserDto): void {
    getObjectKeysAsKeyof(user).forEach((key) => {
      this.setItem(key, user[key]);
    });
  }
}

export const USER_STORAGE = new InjectionToken<UserStorage>('user storage', {
  providedIn: 'root',
  factory: (): UserStorage => {
    const doc = inject(DOCUMENT);
    return new UserStorage(doc.defaultView!.localStorage);
  },
});
