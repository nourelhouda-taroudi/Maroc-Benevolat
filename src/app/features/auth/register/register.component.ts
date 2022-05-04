import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLinear=true;
  number:number=0;
  registerForm1: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, []),
  });
  registerForm2: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    emailValidation: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordValidation: new FormControl(null, [Validators.required]),
  });
  registerForm3: FormGroup = new FormGroup({
    nameAssociation: new FormControl(null, [Validators.required]),
    sigleAssociation: new FormControl(null, [Validators.required]),
    objetSocial: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    codePostal: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    infos: new FormControl(null),
    logo: new FormControl(null)
  });
  registerForm4: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required]),
    facebook: new FormControl(null),
    instagram: new FormControl(null),
    twitter: new FormControl(null),
  });

  hasFormErrors = false;

  constructor() {}

  ngOnInit(): void {}

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registerForm1.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  register() {
    this.checkFormIsValid();
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      address,
      identity,
      contactRequestMethod,
      bio,
      photo,
      gender,
    } = this.registerForm1.value;
  }

  // Check Form is valid
  checkFormIsValid() {
    this.hasFormErrors = false;
    const controls = this.registerForm1.controls;
    if (this.registerForm1.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      return;
    }
  }
  next(){
    this.number++;
  }
  before(){
    this.number--;
  }
}
