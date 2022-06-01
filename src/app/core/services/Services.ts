import { associations } from './../../models/associations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande } from 'src/app/models/demandes';
import { AdminInter } from 'src/app/models/admin';
import { SuppInter } from 'src/app/models/suppression';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http : HttpClient) { }

  getAssociationById(id: number ): Observable<associations>{
    return this.http.get<associations>(`http://localhost:3000/api/association/${id}`);
   
   
  }

  getAssociation(){
    
    return this.http.get<associations[]>('http://localhost:3000/api/association/all');
  
  }

  updateAsso(association:any){
    return this.http.put(`http://localhost:3000/api/association/${association.id}`,association);
  }


  deleteAsso(id: any){
    return this.http.delete(`http://localhost:3000/api/association/${id}`)
  }
 
  getAssociation_Inscription(){
    
    return this.http.get<Demande[]>('http://localhost:3000/api/demandes');
  
  }
  
  saveAsso(data: any){
    return this.http.post<associations[]>('http://localhost:3000/api/association',data);
  }



  getDemandeById(id: number ): Observable<Demande>{
    return this.http.get<Demande>(`http://localhost:3000/api/demandes/${id}`);
   
   
  }

  deleteDemande(id: any){
    return this.http.delete(`http://localhost:3000/api/demandes/${id}`)
  }

  saveUser(data: any){
    return this.http.post<associations[]>('http://localhost:3000/api/user',data);
  }

  loginAdmin(admin:AdminInter){
    return this.http.post<AdminInter[]>('http://localhost:3000/api/admin/login',admin);
  }


  getAssociation_Suppression(){
    
    return this.http.get<SuppInter[]>('http://localhost:3000/api/suppression');
  
  }
}
