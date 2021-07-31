import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserActions } from './user.actions';
import { UserDto } from "@models/user";
import { ApiService } from "@services/api.service";
import { tap } from "rxjs/operators";

export interface UserStateModel {
  isLogin: boolean;
  user?: UserDto;
}

const defaults = {
  isLogin: false,
};

@State<UserStateModel>({
  name: 'user',
  defaults,
})
@Injectable()
export class UserState {

  @Selector()
  static state(state: UserStateModel): UserStateModel {
    return state;
  }

  @Selector()
  static isLogin(state: UserStateModel): boolean {
    return state.isLogin;
  }

  @Selector()
  static user(state: UserStateModel): UserDto | undefined {
    return state.user;
  }

  constructor(
    private api: ApiService,
  ) {
  }

  @Action(UserActions.Login)
  login({setState}: StateContext<UserStateModel>, {payload}: UserActions.Login) {
    return this.api.login(payload).pipe(
      tap((user) => setState({isLogin: true, user})),
    );
  }

  @Action(UserActions.Logout)
  logout({setState}: StateContext<UserStateModel>) {
    setState({
      isLogin: false,
    });
  }
}
