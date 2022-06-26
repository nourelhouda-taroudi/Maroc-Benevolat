import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../../angular-material/angular-material.module';
import {LoginComponent  } from './../auth/login/login.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SlideComponent } from './slide/slide.component';
import { SearchComponent } from '../search/search.component';


@NgModule({
  declarations: [
  
  
    
  
  
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    
  ]
})
export class HomeModule { }
