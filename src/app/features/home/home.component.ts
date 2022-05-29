import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import assoData from '../../../app/features/association.json';
import slideData from '../../../app/features/slide.json';


import { associations } from '../../models/associations';




import { HttpErrorResponse } from '@angular/common/http';
import { PostService } from 'src/app/core/services/Services';

// interface Association{
//   id: number;
//   img:String;
//   desc:String;

// }

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

  edite = false;
  slide : boolean= true;
  searchText: string ='';
  
  constructor(  private asso: PostService, private router: Router) { }
 
  public associations!: associations[] ;
  associ!: associations[];
  cards:associations ={
    nameAssociation: '',
    infos: '',
    facebook: '',
    twitter: '',
    id: 0,
    sigleAssociation: '',
    objetSocial: '',
    phoneAssociation: 0,
    address: '',
    codePostal: '',
    logo:'',
    city: '',
    emailAssociation: '',
    instagram: ''
  }
  
 

  ngOnInit(): void {
    this.getAsso();
  

  }

  public Search(homeform: NgForm){
  //stringify: convert javascript data to json-formatted string
    console.log(JSON.stringify(homeform.value))

  }

  // goToConn(pageName: string): void{

  //   this.router.navigate([`${pageName}`]);

  // }

  // associations: Association[]=assoData;

  slides: Slide[]=slideData;

  getAsso(){
   
   return this.asso.getAssociation().subscribe((response: associations[]) => {
    this.associations = response;
  },
  (error : HttpErrorResponse) => {
    alert(error.message)
  }
);

  }




  goToConn(pageName: string): void{
  
    this.router.navigate([`${pageName}`]);

  }



  public searchAsso(homeform: NgForm): void{
      
    let  key = JSON.stringify(homeform.value);
    
    const results: associations[]= [];
    for (const card of this.associations){
      if(card.infos.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 )   {
        results.push(card);
   

      }
    }
    this.associations = results;
    console.log(results)
    if(results.length == 0 || !key){
      this.getAsso();
    }
  }

  // public searchFacture(key: string): void{
  //   const results: associations[] = [];
  //   console.log(key)
  //   for (const agences of this.associations){
  //     if (agences.nameAssociation.toLowerCase().indexOf(key.toLowerCase()) !== -1 
   
  //    ){
  //       results.push(agences);
  //     }
  //   }
  //   this.associations = results;
  //   console.log(results)
  //   if (results.length === 0 || !key){
  //     this.getAsso();
  //   }
  //   this.slide=false;
  // }

  public onChange(event: any): void {  //event will give you full breif of action
    const choix = event.target.value;
    console.log(choix);
    const results: associations[] = [];
    for (const agences of this.associations){
      if (agences.infos.indexOf(choix) !== -1 ){
        results.push(agences);
       
      }
    }
    this.associations = results;
    this.onChange(event);
    if (results.length === 0 || !choix){
      this.getAsso();
    }
 
  }

    
  editeAnn(post:any){
    this.cards=post
    this.edite=true;
    console.log(this.cards.id)
    this.router.navigate(['profile',this.cards.id])
    
 }

 onSearchTextEntered(searchedValue: string){
   this.searchText = searchedValue
   console.log(this.searchText)
   this.slide=false;
   if(this.searchText === ''){
     this,this.slide=true
   }

 }

}
