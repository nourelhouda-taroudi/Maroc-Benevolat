import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {LoginComponent  } from './../auth/login/login.component';
import { AuthComponent } from '../auth/auth.component';
import { RegisterComponent } from './../auth/register/register.component';
import { Router } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeComponent,}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
