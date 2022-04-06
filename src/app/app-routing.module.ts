import { PageNotFoundComponent } from './shared/errors/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'auth' , 
    loadChildren: () => 
    import('./features/auth/auth.module').then(m => m.AuthModule) 
  },
  { 
    path: '' , 
    children:[
      {
        path:'',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'home', 
        redirectTo:''
      }
    ] 
  },
  { 
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
