import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { NavbarStateModel, UiState, UiStateModel } from "@state/ui/ui.state";
import { Observable } from "rxjs";
import { UiActions } from "@state/ui/ui.actions";

@Injectable()
export class UiFacade {
  @Select(UiState.state) state$!: Observable<UiStateModel>;
  @Select(UiState.navbar) sidebar$!: Observable<NavbarStateModel>;

  constructor(
    private store: Store,
  ) {
  }

  navbar = {
    show: (): Observable<NavbarStateModel> => this.store
      .dispatch(new UiActions.ShowNavbar()),

    hide: (): Observable<NavbarStateModel> => this.store
      .dispatch(new UiActions.HideNavbar()),

    toggle: (): Observable<NavbarStateModel> => this.store
      .dispatch(new UiActions.ToggleNavbar()),

    setWidth: (width: number): Observable<NavbarStateModel> => this.store
      .dispatch(new UiActions.SetWidthNavbar(width)),
  };

  notebar = {
    setWidth: (width: number): Observable<NavbarStateModel> => this.store
      .dispatch(new UiActions.SetWidthNotebar(width)),
  };
}
