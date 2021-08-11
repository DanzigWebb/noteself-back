import { Inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UiActions } from "@state/ui/ui.actions";
import { UI_STORAGE, UiStorage } from "@shared/storages/ui.storage";

export interface UiStateModel {
  navbar: NavbarStateModel;
}

export interface NavbarStateModel {
  isOpen: boolean;
  width: number;
}

const defaults: UiStateModel = {
  navbar: {
    isOpen: true,
    width: 200,
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
    const isOpen = false;

    setState({
      ...state,
      navbar: {...state.navbar, isOpen},
    });

    this.storage.updateNavbarState(getState().navbar);
  }

  @Action(UiActions.ShowNavbar)
  showNavbar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    const isOpen = true;

    setState({
      ...state,
      navbar: {...state.navbar, isOpen},
    });

    this.storage.updateNavbarState(getState().navbar);
  }

  @Action(UiActions.ToggleNavbar)
  toggleNavbar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    const isOpen = !state.navbar.isOpen;

    setState({
      ...state,
      navbar: {...state.navbar, isOpen},
    });

    this.storage.updateNavbarState(getState().navbar);
  }

  @Action(UiActions.SetWidthNavbar)
  setWidth({getState, setState}: StateContext<UiStateModel>, {width}: UiActions.SetWidthNavbar) {
    const state = getState();

    setState({
      ...state,
      navbar: {...state.navbar, width},
    });

    this.storage.updateNavbarState(getState().navbar);
  }
}
