import { associations } from './../../models/associations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

 

  


}
