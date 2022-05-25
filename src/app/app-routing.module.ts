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
    path: 'profile/:id',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'benevoles',
    loadChildren: () => import('./features/benevoles/benevoles.module').then(m=> m.BenevolesModule)
  },
  {
    path: 'nous',
    loadChildren: () => import('./features/nous/nous.module').then(m=> m.NousModule)
  },
  {
    path: 'maroc',
    loadChildren: () => import('./features/maroc/maroc.module').then(m=> m.MarocModule)
  },
  {
    path: 'partenaires',
    loadChildren: () => import('./features/partenaires/partenaires.module').then(m=> m.PartenairesModule)
  },

  {
    path: 'profile/editer/:id',
    loadChildren: () => import('./profile/editer/editer.module').then(m=> m.EditerModule)
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
