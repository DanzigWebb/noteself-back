import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { UserState, UserStateModel } from "@state/user/user.state";
import { Observable } from "rxjs";
import { UserDto, UserLoginDto } from "@models/user";
import { UserActions } from "@state/user/user.actions";
import { switchMap } from "rxjs/operators";

@Injectable()
export class UserFacade {
  @Select(UserState.state) state$!: Observable<UserStateModel>;
  @Select(UserState.isLogin) isLogin$!: Observable<boolean>;
  @Select(UserState.user) user$!: Observable<UserDto>;

  constructor(
    private store: Store,
  ) {
  }

  login(payload: UserLoginDto): Observable<UserStateModel> {
    return this.store.dispatch(new UserActions.Login(payload)).pipe(
      switchMap(() => this.state$),
    );
  }

  update(payload: UserDto): Observable<UserStateModel> {
    return this.store.dispatch(new UserActions.Update(payload)).pipe(
      switchMap(() => this.state$),
    );
  }

  logout(): Observable<UserStateModel> {
    return this.store.dispatch(new UserActions.Logout()).pipe(
      switchMap(() => this.state$),
    );
  }
}
