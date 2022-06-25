import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NousComponent } from './nous.component';

const routes: Routes = [{ path: '', component: NousComponent,}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NousRoutingModule { }
