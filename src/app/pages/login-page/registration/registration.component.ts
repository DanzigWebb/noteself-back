import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserRegistrationDto } from '@models/user.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit, OnDestroy {

  @Output() onSubmit = new EventEmitter<UserRegistrationDto>();

  public form: FormGroup;

  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.comparePasswords();
  }

  submit() {
    if (!this.form.valid) {
      return;
    }

    const dto: UserRegistrationDto = {
      email: this.form.get('email')?.value,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      password: this.form.get('password')?.value,
      phone: this.form.get('phone')?.value
    };

    this.onSubmit.emit(dto);
  }

  private comparePasswords(): void {
    const password = this.form.get('password');
    const confirm = this.form.get('passwordConfirm');

    if (confirm && password) {
      confirm.valueChanges.pipe(
        filter(() => !!password.value),
        tap(() => validate()),
        takeUntil(this.unsubscribe$)
      ).subscribe();

      password.valueChanges.pipe(
        filter(() => confirm.touched),
        tap(() => validate()),
        takeUntil(this.unsubscribe$)
      ).subscribe();

      function validate(): void {
        const isEqual = password?.value === confirm?.value;
        if (!isEqual) {
          confirm?.setErrors({noEqual: true});
          confirm?.markAsTouched();
        }
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
