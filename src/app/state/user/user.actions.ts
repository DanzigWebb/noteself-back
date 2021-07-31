import { UserLoginDto } from "@models/user";

export namespace UserActions {
  export class Login {
    static readonly type = '[User] Login';
    constructor(public payload: UserLoginDto) {}
  }

  export class Logout {
    static readonly type = '[User] Logout';
  }
}


