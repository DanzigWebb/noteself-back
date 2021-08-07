import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.comparePasswords();
  }

  comparePasswords(): void {
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

      function validate() {
        const isEqual = password?.value === confirm?.value;
        if (!isEqual) {
          confirm?.setErrors({noEqual: true});
          confirm?.markAsTouched()
        }
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
