import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

enum LoginValidatorsEnum {
  name = 'invalidLogin'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  get nameInput() {
    return this.form.get('name');
  }

  get invalidError() {
    return this.nameInput?.errors?.[LoginValidatorsEnum.name];
  }

  constructor(
    private fb: FormBuilder,
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

  login() {

  }
}
