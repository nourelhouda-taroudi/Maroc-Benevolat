import { TokenService } from './../core/services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { associations } from '../models/associations';
import { HomeComponent } from '../features/home/home.component';
import { PostService } from '../core/services/Services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  islogIn:boolean=false;
  home!: HomeComponent;

  constructor(private router: Router, 
    private asso: PostService,
    private tokenService:TokenService
    ) {}
    public associations!: associations[];

  associ: associations[] = [];

  ngOnInit(): void {
    this.getAsso();
    this.isLoggedIn();
  }

  public Search(homeform: NgForm) {
    //stringify: convert javascript data to json-formatted string
    console.log(JSON.stringify(homeform.value));
  }

  goToConn(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  getAsso() {
    return this.asso.getAssociation().subscribe(
      (response: associations[]) => {
        this.associations = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  isLoggedIn(){
    // console.log(this.tokenService.loggedIn());
    this.islogIn=this.tokenService.loggedIn();
    console.log(this.islogIn);
    
  }
  Logout() {
    this.tokenService.remove();
    this.router.navigate(['/']);
    this.islogIn=false;
  }

  

 
  }


