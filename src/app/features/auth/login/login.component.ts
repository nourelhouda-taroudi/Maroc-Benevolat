import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading=true;
  loginForm    : FormGroup= new FormGroup(
    {
      email    : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,[Validators.required])
    }
  );

  hasFormErrors = false;
  constructor( ) { }

  ngOnInit(): void {
  }

  // Check if one of form control has an error
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}

  login(){
    this.checkFormIsValid();
    const {email, password} = this.loginForm.value;
  }

  // Check Form is valid
	checkFormIsValid() {
		this.hasFormErrors = false;
		const controls     = this.loginForm.controls;
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
		}
	}

}