import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/services/Services';
import { associations } from 'src/app/models/associations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  association !: associations;
  public associations!: associations[] ;
  constructor(private asso: PostService,private router: Router,private route: ActivatedRoute,public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(parameterMap => {
      const id = Number(parameterMap.get('id'));
      this.getAssoci(id);
      console.log(id)
         })
    this.getAsso();
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


 getAssoci(id : number){
   
  return this.asso.getAssociationById(id).subscribe((response) => {
   this.association= response;

   console.log(this.association)
 
 },
 (error : HttpErrorResponse) => {
   alert(error.message)
 }
);

 }

}
  
