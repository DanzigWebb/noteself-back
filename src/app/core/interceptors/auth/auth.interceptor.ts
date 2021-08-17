import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { UserFacade } from "@state/user/user.facade";
import { Router } from "@angular/router";
import { Routers } from "@core/enums/routers.enum";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private user: UserFacade,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          this.user.logout().subscribe(() => {
            // Todo: падает приложение без перезагрузки страницы после logout (возможно из-за proxy)
            this.router.navigate([Routers.login])
              .then((success) => success && location.reload());
          });
        }

        return throwError(err);
      }),
    );
  }
}
