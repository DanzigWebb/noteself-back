import { Inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UiActions } from "@state/ui/ui.actions";
import { UI_STORAGE, UiStorage } from "@shared/storages/ui.storage";

export interface UiStateModel {
  navbar: NavbarStateModel;
}

export interface NavbarStateModel {
  isOpen: boolean;
}

const defaults: UiStateModel = {
  navbar: {
    isOpen: true,
  },
};

@State<UiStateModel>({
  name: 'ui',
  defaults,
})
@Injectable()
export class UiState {
  @Selector()
  static state(s: UiStateModel): UiStateModel {
    return s;
  }

  @Selector()
  static navbar(s: UiStateModel): NavbarStateModel {
    return s.navbar;
  }

  constructor(
    @Inject(UI_STORAGE) private storage: UiStorage,
  ) {
  }

  @Action(UiActions.HideNavbar)
  hideNavbar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    setState({
      ...state,
      navbar: {isOpen: false},
    });

    this.storage.updateNavbarState(getState().navbar);
  }

  @Action(UiActions.ShowNavbar)
  showNavbar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    setState({
      ...state,
      navbar: {isOpen: true},
    });

    this.storage.updateNavbarState(getState().navbar);
  }

  @Action(UiActions.ToggleNavbar)
  toggleNavbar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    const isOpen = !state.navbar.isOpen;
    setState({
      ...state,
      navbar: {isOpen},
    });

    this.storage.updateNavbarState(getState().navbar);
  }
}
