import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { search } from './search';
import { Router } from '@angular/router';
import assoData from '../../../app/features/association.json';
import slideData from '../../../app/features/slide.json';
import { PostService } from '../../services/post.service';
import { associations } from '../../models/associations';
import { HttpErrorResponse } from '@angular/common/http';

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
  public search : search = new search();
  
  constructor(  private asso: PostService, private router: Router) { }
  searchValue!: string;
  public associations!: associations[] ;
  associ!: associations[];
  cards:associations ={
    nom: '',
    description: '',
    facebook: '',
    twitter: '',
    id: 0,
    siege: '',
    objet: '',
    telephone: 0,
    adresse: '',
    code_postal: 0,
    ville: '',
    email: '',
    instagram: ''
  }
  
 
  searcheValue: string ='';
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

  onSearch(searcheText: string){
       this.searcheValue = searcheText;
       console.log( this.searcheValue);
  }


  goToConn(pageName: string): void{
  
    this.router.navigate([`${pageName}`]);

  }



  public searchAsso(homeform: NgForm): void{
      
    let  key = JSON.stringify(homeform.value);
    
    const results: associations[]= [];
    for (const card of this.associations){
      if(card.description.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 )   {
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
  //   for (const association of this.associations){
  //     if (association.nom.indexOf(key) !== -1 || association.description.indexOf(key) !== -1){
  //       results.push(association);
  //     }
  //   }
  //   this.associations = results;
  //   console.log(results)
  //   if (results.length === 0 || !key){
  //     this.getAsso();
  //   }
  // }

  public onChange(event: any): void {  //event will give you full breif of action
    const choix = event.target.value;
    console.log(choix);
    const results: associations[] = [];
    for (const agences of this.associations){
      if (agences.description.indexOf(choix) !== -1 ){
        results.push(agences);
       
      }
    }
    this.associations = results;
    this.onChange(event);
    if (results.length === 0 || !choix){
      this.getAsso();
    }
 
  }

}
