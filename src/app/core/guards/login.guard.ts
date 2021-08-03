import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserFacade } from "@state/user/user.facade";
import { map, take } from "rxjs/operators";
import { Routers } from "@core/enums/routers.enum";

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private user: UserFacade,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> {
    return this.user.isLogin$.pipe(
      take(1),
      map((isLogin) => this.action(isLogin)),
    );
  }

  action(isLogin: boolean): boolean {
    !isLogin && this.goToLogin();
    return isLogin;
  }

  goToLogin() {
    return this.router.navigate([Routers.login]);
  }

  goToHome() {
    return this.router.navigate([Routers.home]);
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserGuard extends LoginGuard {
  action(isLogin: boolean): boolean {
    !isLogin && this.goToLogin();
    return isLogin;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GuestGuard extends LoginGuard {
  action(isLogin: boolean): boolean {
    isLogin && this.goToHome();
    return !isLogin;
  }
}

