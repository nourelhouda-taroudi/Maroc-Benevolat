import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.css'],
})
export class OtpValidationComponent implements OnInit {
  hasFormErrors = false;
  email: string = '';
  errors: string[] = [];
  state: any;

  constructor(
    private readonly userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params.email || '/offers/list';
    });
  }

  codeForm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.codeForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  // Check Form is valid
  // we have one input
  checkFormIsValid() {
    this.hasFormErrors = false;

    const controls = this.codeForm.controls;
    if (this.codeForm.invalid) {
      Object.keys(controls).forEach((controlName) => {
        controls[controlName].markAsTouched();
        this.errors.push('Code doit être de 6 caractères');
      });
      this.hasFormErrors = true;
      return;
    }
  }
  otpValidation() {
    this.checkFormIsValid();
    if (this.hasFormErrors) {
      return;
    }
    const { code } = this.codeForm.value;
    this.userService.otpValidation(code, this.email).subscribe(
      (res) => {
        this.router.navigateByUrl('/auth/reset-password');
      },
      (err) => {
        console.log(err);
        if (err.status == 403 || err.status == 404 || err.status == 406) {
          this.hasFormErrors = true;
          this.errors.push(err.error.error);
          return;
        }
        if (err.status == 500) {
          this.hasFormErrors = true;
          this.errors.push('Erreur de serveur, veuillez réessayer plus tard');
          return;
        }
      }
    );
  }
  changeError() {
    this.hasFormErrors = false;
    this.errors = [];
  }
}
