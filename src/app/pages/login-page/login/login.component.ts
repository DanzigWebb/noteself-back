import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginDto } from '@models/user.interface';

enum LoginValidatorsEnum {
  name = 'invalidLogin'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<UserLoginDto>();

  form!: FormGroup;

  get nameInput() {
    return this.form.get('name');
  }

  get invalidError() {
    return this.nameInput?.errors?.[LoginValidatorsEnum.name];
  }

  constructor(
    private fb: FormBuilder
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

  submit(): void {
    if (!this.form.valid) {
      return;
    }

    const dto = this.createLoginDto();
    this.onSubmit.emit(dto);
  }

  private createLoginDto(): UserLoginDto {
    const name = this.form.value.name;
    const password = this.form.value.password;

    return {name, password};
  }
}
