import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../../angular-material/angular-material.module';
import { BenevolesRoutingModule } from './benevoles-routing.module';
import { HomeComponent } from '../home/home.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BenevolesRoutingModule,
    AngularMaterialModule
  ]
})
export class BenevolesModule { }
