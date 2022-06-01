import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/Services';
import { associations } from 'src/app/models/associations';
import { Demande } from 'src/app/models/demandes';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
public demandes!:Demande[]
public demande!:Demande
  public associations!: associations[] ;
  constructor(private asso: PostService) { }

  ngOnInit(): void {
    this.getAsso()
  }

  getAsso(){
   
    return this.asso.getAssociation_Inscription().subscribe((response: Demande[]) => {
     this.demandes= response;
   console.log(response)
    
   },
   (error : HttpErrorResponse) => {
     alert(error.message)
   }
 );
 
   }




getDemande(id: number) {
  return this.asso.getDemandeById(id).subscribe(
    (response) => {
      this.demande = response;
  
   
       this.asso.saveAsso(response).subscribe((result )=>{
     
      })
      this.asso.saveUser(response).subscribe((result )=>{
     
      })

      this.asso.deleteDemande(id).subscribe(() =>{
        this.demandes=this.demandes.filter(post => post.id !=id)
      })
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

deleteDemande(id: any){
  this.asso.deleteDemande(id).subscribe(() =>{
    this.demandes=this.demandes.filter(post => post.id !=id)
  })
}

}
