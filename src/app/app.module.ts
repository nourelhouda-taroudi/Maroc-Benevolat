import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BenevolesComponent } from './features/benevoles/benevoles.component';
import { HomeComponent } from './features/home/home.component';
import { MarocComponent } from './features/maroc/maroc.component';
import { NousComponent } from './features/nous/nous.component';
import { PartenairesComponent } from './features/partenaires/partenaires.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchfilterPipe } from './searchfilter.pipe';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { SlideComponent } from './features/home/slide/slide.component';
import { SearchComponent } from './features/search/search.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';


import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { AllAssociationsComponent } from './admin/all-associations/all-associations.component';
import { SuppressionComponent } from './admin/suppression/suppression.component';
import { PageComponent } from './page/page.component';
import { MembresComponent } from './membres/membres.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignalsComponent } from './admin/signals/signals.component';



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
    SearchfilterPipe,

    SlideComponent,
    SearchComponent,
    LoginAdminComponent,
    
  
    HomeAdminComponent,
            HeaderAdminComponent,
            AllAssociationsComponent,
            SuppressionComponent,
            PageComponent,
            SignalsComponent
           

 
  
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    NgxPaginationModule,
    MatTabsModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
