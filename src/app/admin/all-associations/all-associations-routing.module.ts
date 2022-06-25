import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAssociationsComponent } from './all-associations.component';

const routes: Routes = [{
  path:'', component:AllAssociationsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllAssociationsRoutingModule { }
