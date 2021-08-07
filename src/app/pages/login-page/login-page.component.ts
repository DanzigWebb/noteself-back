import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

type FormView = 'login' | 'registration';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {

  view: FormView = 'login';

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleView() {
    if (this.view === 'login') {
      this.view = 'registration'
    } else {
      this.view = 'login'
    }
  }
}
