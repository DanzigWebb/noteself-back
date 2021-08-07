import { UserDto, UserLoginDto, UserRegistrationDto } from '@models/user.interface';

export namespace UserActions {
  export class Login {
    static readonly type = '[User] Login';
    constructor(public payload: UserLoginDto) {}
  }

  export class Registration {
    static readonly type = '[User] Registration';
    constructor(public payload: UserRegistrationDto) {}
  }

  export class Update {
    static readonly type = '[User] Update';
    constructor(public payload: UserDto) {}
  }

  export class Logout {
    static readonly type = '[User] Logout';
  }
}


