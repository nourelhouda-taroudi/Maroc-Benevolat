import { AfterLoginGuard } from './core/guards/after-login.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './shared/errors/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';



const routes: Routes = [
  { 
    path: 'auth' ,
    canActivate:[AfterLoginGuard],
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
    canActivate:[AuthGuard],
    loadChildren: () => import('./profile/editer/editer.module').then(m=> m.EditerModule)
  },
 
  {
    path: 'story',
    loadChildren: () => import('./profile/story/story.module').then(m=> m.StoryModule)
  },
  {
    path: 'annonce',
    loadChildren: () => import('./profile/post/post.module').then(m=> m.PostModule)
  },
  {
    path: 'login_admin',
    loadChildren: () => import('./admin/login-admin/login-admin.module').then(m=> m.LoginAdminModule)
  },
  {
    path: 'home_admin',
    loadChildren: () => import('./admin/home-admin/home-admin.module').then(m=> m.HomeAdminModule)
  },
  {
    path: 'all_associations',
    loadChildren: () => import('./admin/all-associations/all-associations.module').then(m=> m.AllAssociationsModule)
  },
  {
    path: 'Suppression',
    loadChildren: () => import('./admin/suppression/suppression.module').then(m=> m.SuppressionModule)
  },
  {
    path: 'Demande',
  component:PageComponent
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
