import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { SidebarStateModel, UiState, UiStateModel } from "@state/ui/ui.state";
import { Observable } from "rxjs";
import { UiActions } from "@state/ui/ui.actions";
import { switchMap } from "rxjs/operators";

@Injectable()
export class UiFacade {
  @Select(UiState.state) state$!: Observable<UiStateModel>;
  @Select(UiState.sidebar) sidebar$!: Observable<SidebarStateModel>;

  constructor(
    private store: Store,
  ) {
  }

  sidebar = {
    show: (): Observable<SidebarStateModel> => this.store
      .dispatch(new UiActions.ShowSidebar())
      .pipe(switchMap(() => this.sidebar$)),

    hide: (): Observable<SidebarStateModel> => this.store
      .dispatch(new UiActions.HideSidebar())
      .pipe(switchMap(() => this.sidebar$)),

    toggle: (): Observable<SidebarStateModel> => this.store
      .dispatch(new UiActions.ToggleSidebar())
      .pipe(switchMap(() => this.sidebar$)),
  };
}
