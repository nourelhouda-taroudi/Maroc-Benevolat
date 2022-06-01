import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/Services';
import { SuppInter } from 'src/app/models/suppression';

@Component({
  selector: 'app-suppression',
  templateUrl: './suppression.component.html',
  styleUrls: ['./suppression.component.css']
})
export class SuppressionComponent implements OnInit {

  constructor(private asso:PostService) { }
  demandes!: SuppInter[];

  ngOnInit(): void {
    this.getAsso()
  }

  getAsso(){
   
    return this.asso.getAssociation_Suppression().subscribe((response: SuppInter[]) => {
     this.demandes= response;
   console.log(response)
    
   },
   (error : HttpErrorResponse) => {
     alert(error.message)
   }
 );
 
   }

}
