import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BenevolesComponent } from './features/benevoles/benevoles.component';
import { HomeComponent } from './features/home/home.component';
import { MarocComponent } from './features/maroc/maroc.component';
import { NousComponent } from './features/nous/nous.component';
import { PartenairesComponent } from './features/partenaires/partenaires.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


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
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
