import { Component, OnInit } from '@angular/core';
import slideData from '../../association.json';

interface Slide{
  img: String;
  para: String;
}
@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})


export class SlideComponent implements OnInit {
 slides: Slide[]= [];
  
  constructor() { }

  ngOnInit(): void {
  }



}
