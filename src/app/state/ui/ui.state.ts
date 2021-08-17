import { Inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UiActions } from "@state/ui/ui.actions";
import { UI_STORAGE, UiStorage } from "@shared/storages/ui.storage";

export interface UiStateModel {
  navbar: NavbarStateModel;
  notebar: NotebarStateModel;
  combinebar: CombinebarStateModel;
}

export interface NavbarStateModel {
  isOpen: boolean;
  width: number;
}

export interface NotebarStateModel {
  width: number;
}

export interface CombinebarStateModel {
  isOpen: boolean;
}

const defaults: UiStateModel = {
  navbar: {
    isOpen: true,
    width: 200,
  },
  notebar: {
    width: 200,
  },
  combinebar: {
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

  @Selector()
  static combinebar(s: UiStateModel): CombinebarStateModel {
    return s.combinebar;
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

    this.storage.updateUiState(getState());
  }

  @Action(UiActions.ShowNavbar)
  showNavbar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    const isOpen = true;

    setState({
      ...state,
      navbar: {...state.navbar, isOpen},
    });

    this.storage.updateUiState(getState());
  }

  @Action(UiActions.ToggleNavbar)
  toggleNavbar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    const isOpen = !state.navbar.isOpen;

    setState({
      ...state,
      navbar: {...state.navbar, isOpen},
    });

    this.storage.updateUiState(getState());
  }

  @Action(UiActions.SetWidthNavbar)
  setWidthNavbar({getState, setState}: StateContext<UiStateModel>, {width}: UiActions.SetWidthNavbar) {
    const state = getState();

    setState({
      ...state,
      navbar: {...state.navbar, width},
    });

    this.storage.updateUiState(getState());
  }

  @Action(UiActions.SetWidthNotebar)
  setWidthNotebar({getState, setState}: StateContext<UiStateModel>, {width}: UiActions.SetWidthNotebar) {
    const state = getState();

    setState({
      ...state,
      notebar: {...state.notebar, width},
    });

    this.storage.updateUiState(getState());
  }

  @Action(UiActions.ShowCombinebar)
  showCombinebar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    const isOpen = true;

    setState({
      ...state,
      combinebar: {...state.combinebar, isOpen},
    });

    this.storage.updateUiState(getState());
  }

  @Action(UiActions.HideCombinebar)
  hideCombinebar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    const isOpen = false;

    setState({
      ...state,
      combinebar: {...state.combinebar, isOpen},
    });

    this.storage.updateUiState(getState());
  }

  @Action(UiActions.ToggleCombinebar)
  toggleCombinebar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    const isOpen = !state.combinebar.isOpen;

    setState({
      ...state,
      combinebar: {...state.combinebar, isOpen},
    });

    this.storage.updateUiState(getState());
  }
}
