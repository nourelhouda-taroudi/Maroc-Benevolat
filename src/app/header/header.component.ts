import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { search } from '../features/home/search';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

}
