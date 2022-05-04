import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarocComponent } from './maroc.component';


const routes: Routes = [{ path: '', component: MarocComponent,}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarocRoutingModule { }
