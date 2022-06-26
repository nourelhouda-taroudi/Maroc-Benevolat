import { UploadsService } from 'src/app/core/services/uploads.service';
import { associations } from 'src/app/models/associations';
import { UserService } from './../core/services/user.service';
import { TokenService } from './../core/services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { PostService } from '../core/services/Services';
import { AdminInter } from '../models/admin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  UserEmail:string='';
  id!:number;
  islogIn:boolean=false;
  home!: HomeComponent;
  constructor(private router: Router, 
    private asso: PostService,
    private tokenService:TokenService,
    private route: ActivatedRoute,
    private userService:UserService,
    public uploadService:UploadsService,
    ) {}
   associations!: associations[];
  associ: associations[] = [];
  user=new AdminInter();
  association=new associations();
  ngOnInit(): void {
    this.getAsso();
    this.isLoggedIn();
  }

  public Search(homeform: NgForm) {
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
    this.islogIn=this.tokenService.loggedIn();
   this.UserEmail=this.tokenService.getInfos().email;
   if(this.islogIn){
    this.getUserByEmail(this.UserEmail); 
   }
  }

  getUserByEmail(email:string){
    return this.userService.findOneEmail(email).subscribe(
      (response) => {
        this.user = response;
        this.id=this.user.association_id;
        this.getAssoci(this.user.association_id)   
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  getAssoci(id: number) {
    return this.asso.getAssociationById(id).subscribe(
      (response) => {
        this.association = response;
        console.log(this.association);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  Logout() {
    this.tokenService.remove();
    this.router.navigate(['/']);
    this.islogIn=false;
  }

  }


