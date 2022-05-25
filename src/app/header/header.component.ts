import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { search } from '../features/home/search';
import { associations } from '../models/associations';
import { PostService } from '../features/home/services/post.service';
import { HomeComponent } from '../features/home/home.component';
import { OverlayOutsideClickDispatcher } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   home!: HomeComponent;
  public search : search = new search();
  constructor(private router: Router,private asso: PostService) { }
  public associations!: associations[] ;



  associ: associations[] = [];

  ngOnInit(): void {
    this.getAsso();
  }

  public Search(homeform: NgForm){
    //stringify: convert javascript data to json-formatted string
      console.log(JSON.stringify(homeform.value))
  
    }
  
    goToConn(pageName: string): void{
  
      this.router.navigate([`${pageName}`]);
  
    }

    getAsso(){
   
      return this.asso.getAssociation().subscribe((response: associations[]) => {
       this.associations = response;
     },
     (error : HttpErrorResponse) => {
       alert(error.message)
     }
   );
   
     }

  
     

  

   
}
