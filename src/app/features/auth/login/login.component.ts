import { UserService } from './../../../core/services/user.service';
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
  error="";
  loginForm    : FormGroup= new FormGroup(
    {
      email    : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,[Validators.required,Validators.minLength(6)])
    }
  );

  hasFormErrors = false;
  constructor( private readonly userService:UserService) { }

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
    if(this.hasFormErrors){
      return
    }
    const {email, password} = this.loginForm.value;
    const payload = {
      email,
      password
    }
    // connect to the userservice
    this.userService.signIn(payload).subscribe(
      response=>{
        console.log(response);
      },
      err=>{
        console.log(err);
        if(err.status==403){
          this.hasFormErrors=true;
          this.error=err.error.error;
          return
        }
        if(err.status==400){
          this.hasFormErrors=true;
          this.error=err.error.message;
          return
        }
        if(err.status==500){
          this.hasFormErrors=true;
          this.error="Erreur de serveur, veuillez réessayer plus tard";
          return
        }
      }
    )
    
  }
  changeError(){
    this.hasFormErrors=false;
    this.error="";
  }

  // Check Form is valid
	checkFormIsValid() {
    
    this.hasFormErrors = false;
		const controls     = this.loginForm.controls;
		if (this.loginForm.invalid) {
      if(this.isControlHasError('password','minlength')){
        this.error = "Mot de passe est court(6 caractére minimum)";
			  this.hasFormErrors = true;
        return;
      }
      this.error="Email ou mot de passe est invalide";
      
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
		}
	}

}