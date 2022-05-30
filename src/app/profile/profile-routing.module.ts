import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [{ path: '', component: ProfileComponent },
{ 
  path: 'editestory' , 
  loadChildren: () => 
  import('./story/story.module').then(m => m.StoryModule) 
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
