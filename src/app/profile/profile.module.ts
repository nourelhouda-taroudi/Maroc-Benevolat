import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ProfilDetailComponent } from './profil-detail/profil-detail.component';
import { PostComponent } from './post/post.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    ProfileComponent,
    HeaderComponent,
    ProfilDetailComponent,
    PostComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
     AngularMaterialModule,
     FormsModule,ReactiveFormsModule
    //BrowserAnimationsModule
  ]
})
export class ProfileModule { }
