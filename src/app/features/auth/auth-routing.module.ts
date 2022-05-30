import { OtpValidationComponent } from './../../otp-validation/otp-validation.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children:[
      {
        path:'',
        redirectTo:'login'
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },
      {
        path:'forget-password',
        component:ForgetPasswordComponent
      },
      {
        path:'reset-password',
        component:ResetPasswordComponent
      },
      {
        path:'otpValidation',
        component:OtpValidationComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
