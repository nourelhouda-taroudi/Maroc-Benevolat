import { associations } from './../../models/associations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande } from 'src/app/models/demandes';
import { AdminInter } from 'src/app/models/admin';
import { SuppInter } from 'src/app/models/suppression';
import { likes } from 'src/app/models/likes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http : HttpClient) { }
  ipAddress = '';
  apiUrl = environment.baseURL;
  getAssociationById(id: number ): Observable<associations>{
    return this.http.get<associations>(`${this.apiUrl}/association/${id}`);
   
   
  }

  getAssociation(){
    
    return this.http.get<associations[]>(`${this.apiUrl}/association/all`);
  
  }

  updateAsso(association:any){
    return this.http.put(`${this.apiUrl}/association/${association.id}`,association);
  }


  deleteAsso(id: any){
    return this.http.delete(`${this.apiUrl}/association/${id}`)
  }
 
  getAssociation_Inscription(){
    
    return this.http.get<Demande[]>(`${this.apiUrl}/demandes`);
  
  }
  
  saveAsso(data: any){
    return this.http.post<associations>(`${this.apiUrl}/association`,data);
  }



  getDemandeById(id: number ): Observable<Demande>{
    return this.http.get<Demande>(`${this.apiUrl}/demandes/${id}`);
   
   
  }

  deleteDemande(id: any){
    return this.http.delete(`${this.apiUrl}/demandes/${id}`)
  }

  saveUser(id:number,data: any){
    return this.http.post<any>(`${this.apiUrl}/user?associationId=${id}`,data);
  }

  loginAdmin(admin:AdminInter){
    return this.http.post<AdminInter[]>(`${this.apiUrl}/admin/login`,admin);
  }


  getAssociation_Suppression(){
    
    return this.http.get<SuppInter[]>(`${this.apiUrl}/suppression`);
  
  }

  


  
 
}
