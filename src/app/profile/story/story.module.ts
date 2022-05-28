import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoryRoutingModule } from './story-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoryRoutingModule,
    NgxPaginationModule
  ]
})
export class StoryModule { }
