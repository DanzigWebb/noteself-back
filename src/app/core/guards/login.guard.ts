import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserFacade } from "@state/user/user.facade";
import { take, tap } from "rxjs/operators";
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
      tap((isUser) => !isUser && this.goToLogin()),
    );
  }

  private goToLogin() {
    return this.router.navigate([Routers.login]);
  }
}
