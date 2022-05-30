import { OrderByPipe } from './pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ProfilDetailComponent } from './profil-detail/profil-detail.component';
import { PostComponent } from './post/post.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { EditerComponent } from './editer/editer.component'
import { StoryComponent } from './story/story.component';
import { ContactComponent } from './contact/contact.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfilDetailComponent,
    PostComponent,
    OrderByPipe,
    EditerComponent,
    StoryComponent,
    ContactComponent,
   
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
     AngularMaterialModule,
     FormsModule,ReactiveFormsModule,
     NgxPaginationModule
    //BrowserAnimationsModule
  ]
})
export class ProfileModule { }
