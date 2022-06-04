import { UserService } from './../../../core/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  error: string = '';
  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  hasFormErrors = false;

  constructor(
    private router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {}

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.emailForm.controls[controlName];
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
    const controls = this.emailForm.controls;
    if (this.emailForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      return;
    }
  }

  forget() {
    this.checkFormIsValid();
    const { email } = this.emailForm.value;
    this.userService.forgetPassword(email).subscribe(
      (res) => {
        this.router.navigate(['/auth/otp-validation'], {
          queryParams: { email: email },
        });
      },
      (err) => {
        console.log(err);
        if (err.status == 403 || err.status == 404) {
          this.hasFormErrors = true;
          this.error = err.error.error;
          return;
        }
        if (err.status == 500) {
          this.hasFormErrors = true;
          this.error = 'Erreur de serveur, veuillez réessayer plus tard';
          return;
        }
      }
    );
  }
  changeError() {
    this.hasFormErrors = false;
    this.error = '';
  }
}
