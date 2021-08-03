import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from "rxjs/operators";
import { UserFacade } from "@state/user/user.facade";
import { Routers } from "@core/enums/routers.enum";

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {

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
      map(is => !is),
      tap((isGuest) => !isGuest && this.goToHome()),
    );
  }

  private goToHome() {
    return this.router.navigate([Routers.home]);
  }
}
