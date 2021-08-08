import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { NavbarStateModel, UiState, UiStateModel } from "@state/ui/ui.state";
import { Observable } from "rxjs";
import { UiActions } from "@state/ui/ui.actions";
import { switchMap } from "rxjs/operators";

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
      .dispatch(new UiActions.ShowNavbar())
      .pipe(switchMap(() => this.sidebar$)),

    hide: (): Observable<NavbarStateModel> => this.store
      .dispatch(new UiActions.HideNavbar())
      .pipe(switchMap(() => this.sidebar$)),

    toggle: (): Observable<NavbarStateModel> => this.store
      .dispatch(new UiActions.ToggleNavbar())
      .pipe(switchMap(() => this.sidebar$)),
  };
}
