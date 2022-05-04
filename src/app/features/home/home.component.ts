import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { search } from './search';
import { Router } from '@angular/router';
import assoData from '../../../app/features/association.json';
import slideData from '../../../app/features/slide.json';

interface Association{
  id: number;
  img:String;
  desc:String;

}

interface Slide{
  img: String;
  para: String;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public search : search = new search();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public Search(homeform: NgForm){
  //stringify: convert javascript data to json-formatted string
    console.log(JSON.stringify(homeform.value))

  }

  goToConn(pageName: string): void{

    this.router.navigate([`${pageName}`]);

  }

  associations: Association[]=assoData;

  slides: Slide[]=slideData;


  

}
