import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserLoginDto, UserRegistrationDto } from '@models/user.interface';
import { UserFacade } from '@state/user/user.facade';
import { Router } from '@angular/router';
import { Routers } from '@core/enums/routers.enum';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

type FormView = 'login' | 'registration';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {

  view: FormView = 'login';

  constructor(
    private user: UserFacade,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  toggleView() {
    if (this.view === 'login') {
      this.view = 'registration';
    } else {
      this.view = 'login';
    }
  }

  registration(dto: UserRegistrationDto) {
    this.user.registration(dto).subscribe(() => {
      this.goToHome();
    });
  }

  login(dto: UserLoginDto) {
    this.user.login(dto).pipe(
      catchError((err: HttpErrorResponse) => {
        alert(err.message);
        return throwError(err);
      }),
    ).subscribe(() => {
      this.goToHome();
    });
  }

  private goToHome(): Promise<boolean> {
    return this.router.navigate([Routers.home]);
  }
}
