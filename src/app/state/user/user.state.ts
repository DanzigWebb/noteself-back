import { Inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserActions } from './user.actions';
import { UserDto } from '@models/user.interface';
import { ApiService } from '@services/api.service';
import { switchMap, take, tap } from 'rxjs/operators';
import { USER_STORAGE, UserStorage } from '@shared/storages/user.storage';
import { SubjectFacade } from "@state/subject/subject.facade";
import { NoteFacade } from "@state/note/note.facade";
import { forkJoin } from "rxjs";

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
    @Inject(USER_STORAGE) private storage: UserStorage,
    private api: ApiService,
    private subjectFacade: SubjectFacade,
    private noteFacade: NoteFacade,
  ) {
  }

  @Action(UserActions.Login)
  login({setState}: StateContext<UserStateModel>, {payload}: UserActions.Login) {
    return this.api.login(payload).pipe(
      tap((user) => {
        setState({isLogin: true, user});
        this.storage.setUser(user);
      }),
      switchMap(() => forkJoin([
        this.noteFacade.getAll().pipe(take(1)),
        this.subjectFacade.getAll().pipe(take(1)),
      ])),
      tap(() => this.noteFacade.checkDefaultSubject())
    );
  }

  @Action(UserActions.Registration)
  registration({setState}: StateContext<UserStateModel>, {payload}: UserActions.Registration) {
    return this.api.registration(payload).pipe(
      tap((user) => {
        setState({isLogin: true, user});
        this.storage.setUser(user);
      }),
    );
  }

  @Action(UserActions.Update)
  update({setState}: StateContext<UserStateModel>, {payload}: UserActions.Update) {
    setState({
      isLogin: true,
      user: {
        ...payload,
      },
    });
  }

  @Action(UserActions.Logout)
  logout({setState}: StateContext<UserStateModel>) {
    setState({isLogin: false});
    this.storage.clear();
  }
}
