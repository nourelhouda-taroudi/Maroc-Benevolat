import { UploadsService } from './../../../core/services/uploads.service';
import { Router } from '@angular/router';
import { UserService } from './../../../core/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLinear = true;
  hide:boolean=true;
  hideValidation:boolean=true;
  number: number = 0;
  imageError: string = '';
  selectedImg: File | undefined;
  imagePath: string = '';
  imgURL: any;
  samePassword: boolean = false;
  sameEmail:boolean=false;
  formData: FormData = new FormData();
  registerForm1: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
  });
  registerForm2: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    emailValidation: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    passwordValidation: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  registerForm3: FormGroup = new FormGroup({
    nameAssociation: new FormControl(null, [Validators.required]),
    sigleAssociation: new FormControl(null, [Validators.required]),
    objetSocial: new FormControl(null, [Validators.required]),
    phoneAssociation: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    codePostal: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    infos: new FormControl(null),
    logo: new FormControl(null),
  });
  registerForm4: FormGroup = new FormGroup({
    emailAssociation: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    facebook: new FormControl(null),
    instagram: new FormControl(null),
    twitter: new FormControl(null),
  });

  hasFormErrors = false;

  constructor(
    private readonly userService: UserService,
    private readonly uploadsService: UploadsService,
    private readonly router: Router
  ) {}

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
    const { firstname, lastname, gender, phone } = this.registerForm1.value;
    const { email, password } = this.registerForm2.value;
    const {
      nameAssociation,
      sigleAssociation,
      objetSocial,
      phoneAssociation,
      address,
      codePostal,
      city,
      infos,
      logo,
    } = this.registerForm3.value;
    console.log({ phoneAssociation });

    const { emailAssociation, facebook, instagram, twitter } =
      this.registerForm4.value;
    const payload = {
      firstname,
      lastname,
      phone: +phone,
      gender,
      email,
      password,
      association: {
        address,
        nameAssociation,
        phoneAssociation: +phoneAssociation,
        sigleAssociation,
        objetSocial,
        codePostal,
        city,
        infos,
        logo,
        emailAssociation,
        facebook,
        instagram,
        twitter,
      },
    };
    this.userService.signUp(payload).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/auth/login');
      },
      (err) => {
        console.error(err);
        if (err.status === 400) {
          // show error message
        }
      }
    );
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
  next() {
    this.number++;
  }
  before() {
    this.number--;
  }
  isSamePassword() {
    const password = this.registerForm2.controls['password'];
    const passwordValidation =
      this.registerForm2.controls['passwordValidation'];

    const tst =
      password.value !== passwordValidation.value &&
      (password.dirty || password.touched) &&
      (passwordValidation.dirty || passwordValidation.touched);
    this.samePassword = tst;
  }
  isSameEmail() {
    const email = this.registerForm2.controls['email'];
    const emailValidation =
      this.registerForm2.controls['emailValidation'];

    const tst =
      email.value !== emailValidation.value &&
      (email.dirty || email.touched) &&
      (emailValidation.dirty || emailValidation.touched);
    this.sameEmail = tst;
  }
  preview(event: any) {
    if (event.target.files.length === 0) return;

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.imageError = 'Vous devez choisir une image!!!';
      return;
    } else {
      this.imageError = '';
      this.selectedImg = <File>event.target.files[0];

      var reader = new FileReader();
      this.imagePath = event.target.files;

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
    let data = new FormData();
    data.append('image', this.selectedImg);
    this.uploadsService.uploadImage(data).subscribe(
      (res: any) => {
        // console.log(res);
        this.registerForm3.get('logo')?.setValue(res.filename);
        // console.log(this.registerForm3.get('logo')?.value);
      },
      (err) => {
        // console.log(err);
        if (err.error.statusCode == 400) {
          this.imageError = err.error.message;
        }
      }
    );
  }
}
