import { Inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UiActions } from "@state/ui/ui.actions";
import { UI_STORAGE, UiStorage } from "@shared/storages/ui.storage";

export interface UiStateModel {
  sidebar: SidebarStateModel;
}

export interface SidebarStateModel {
  isOpen: boolean;
}

const defaults: UiStateModel = {
  sidebar: {
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
  static sidebar(s: UiStateModel): SidebarStateModel {
    return s.sidebar;
  }

  constructor(
    @Inject(UI_STORAGE) private storage: UiStorage
  ) {
  }

  @Action(UiActions.HideSidebar)
  hideSidebar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    setState({
      ...state,
      sidebar: {isOpen: false},
    });

    this.storage.updateSidebarState(state.sidebar);
  }

  @Action(UiActions.ShowSidebar)
  showSidebar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    setState({
      ...state,
      sidebar: {isOpen: true},
    });

    this.storage.updateSidebarState(state.sidebar);
  }

  @Action(UiActions.ToggleSidebar)
  toggleSidebar({getState, setState}: StateContext<UiStateModel>) {
    const state = getState();
    const isOpen = !state.sidebar.isOpen;
    setState({
      ...state,
      sidebar: {isOpen},
    });

    this.storage.updateSidebarState(state.sidebar);
  }
}
