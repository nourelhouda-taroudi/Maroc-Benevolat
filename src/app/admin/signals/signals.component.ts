import { Signaler } from './../../models/signaler';

import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit {
signale:Signaler[]=[];
  constructor(private service:PostService) { }

  ngOnInit(): void {
    this.getSignale();
  }
getSignale(){
  return this.service.getSignal().subscribe((response:Signaler[])=>
  this.signale=response)
}
}
