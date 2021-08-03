import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserFacade } from "@state/user/user.facade";
import { UserLoginDto } from "@models/user.interface";
import { catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { Routers } from "@core/enums/routers.enum";
import { Router } from "@angular/router";

enum LoginValidatorsEnum {
  name = 'invalidLogin'
}

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;

  get nameInput() {
    return this.form.get('name');
  }

  get invalidError() {
    return this.nameInput?.errors?.[LoginValidatorsEnum.name];
  }

  constructor(
    private fb: FormBuilder,
    private user: UserFacade,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login(): void {
    const dto = this.createLoginDto();
    this.user.login(dto).pipe(
      catchError((err: HttpErrorResponse) => {
        alert(err.message);
        return throwError(err);
      }),
    ).subscribe(() => {
      this.goToHome();
    });
  }

  private createLoginDto(): UserLoginDto {
    const name = this.form.value.name;
    const password = this.form.value.password;

    return {name, password};
  }

  private goToHome() {
    return this.router.navigate([Routers.home]);
  }
}
