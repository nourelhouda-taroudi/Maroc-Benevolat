import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { HomeComponent } from './features/home/home.component';
import { BenevolesComponent } from './features/benevoles/benevoles.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NousComponent } from './features/nous/nous.component';
import { MarocComponent } from './features/maroc/maroc.component';
import { PartenairesComponent } from './features/partenaires/partenaires.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BenevolesComponent,
    HeaderComponent,
    FooterComponent,
    NousComponent,
    MarocComponent,
    PartenairesComponent,
 
  
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,

    MatTabsModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
