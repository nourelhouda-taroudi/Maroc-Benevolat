import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenevolesComponent } from './benevoles.component';

const routes: Routes = [{ path: '', component: BenevolesComponent,}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BenevolesRoutingModule { }
