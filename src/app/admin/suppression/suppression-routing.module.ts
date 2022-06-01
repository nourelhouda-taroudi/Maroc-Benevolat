import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppressionComponent } from './suppression.component';

const routes: Routes = [{
  path:'',component:SuppressionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppressionRoutingModule { }
