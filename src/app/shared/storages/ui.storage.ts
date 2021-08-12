import { inject, Injectable, InjectionToken } from "@angular/core";
import { AbstractStorage } from "@shared/storages/abstract.storage";
import { DOCUMENT } from "@angular/common";
import { StorageEnum } from "@shared/storages/storage.enum";
import { NavbarStateModel, NotebarStateModel, UiStateModel } from "@state/ui/ui.state";

@Injectable()
export class UiStorage extends AbstractStorage {
  key: string = StorageEnum.ui;

  constructor(public storage: Storage) {
    super(storage);
    super.init();
  }

  updateUiState(state: UiStateModel) {
    this.setItem<NotebarStateModel>('notebar', state.notebar);
    this.setItem<NavbarStateModel>('navbar', state.navbar);
  }
}

export const UI_STORAGE = new InjectionToken<UiStorage>('ui storage', {
  providedIn: 'root',
  factory: (): UiStorage => {
    const doc = inject(DOCUMENT);
    return new UiStorage(doc.defaultView!.localStorage);
  },
});
