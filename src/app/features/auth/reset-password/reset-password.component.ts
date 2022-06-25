import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  error: string = '';

  resetForm: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    retapPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  hasFormErrors = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.resetForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  // Check Form is valid
  checkFormIsValid() {
    this.hasFormErrors = false;
    const controls = this.resetForm.controls;
    if (this.resetForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      return;
    }
  }

  reset() {
    this.checkFormIsValid();
    const { newPassword, retapPassword } = this.resetForm.value;
    if (newPassword == retapPassword) {
      this.router.navigateByUrl('/auth/login');
    } else {
      alert('le mot de passe different dans les deux champs ');
    }
  }
  changeError() {
    this.hasFormErrors = false;
    this.error = '';
  }
}
