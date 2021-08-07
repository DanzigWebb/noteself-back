import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserRegistrationDto } from '@models/user.interface';
import { UserFacade } from '@state/user/user.facade';
import { Router } from '@angular/router';
import { Routers } from '@core/enums/routers.enum';

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

  private goToHome() {
    return this.router.navigate([Routers.home]);
  }
}
