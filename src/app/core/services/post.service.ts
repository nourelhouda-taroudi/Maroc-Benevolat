import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { associations } from 'src/app/models/associations';
import { likes } from 'src/app/models/likes';
import { Membres } from 'src/app/models/membre';
import { SuppInter } from 'src/app/models/suppression';



import { Post } from '../../models/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl="http://localhost:3000/api/post";
  constructor(private http:HttpClient) {}
    findAll()
      {
      return  this.http.get<Post[]>(this.apiUrl);
    }
    delete(id: any){
      return this.http.delete(`${this.apiUrl}/${id}`)
    }
   persist(post:any){
     return this.http.post<Post>(this.apiUrl,post)
   }
   likes( id: any,like: any){
    return this.http.patch(`${this.apiUrl}/${id}`,{like:!like})
   }
   update(post:any){
     return this.http.put(`${this.apiUrl}/${post.id}`,post);
   }

   getAssociation(){
    
    return this.http.get<associations[]>('http://localhost:3000/api/association/all');
  
  }

  getAssociationById(id: number ): Observable<associations>{
    return this.http.get<associations>(`http://localhost:3000/api/association/${id}`);
   
   
  }

 


  saveDemande(data: any){
    return this.http.post<SuppInter[]>('http://localhost:3000/api/suppression',data);
  }

  ajoutMembre(data: any){
    return this.http.post<Membres[]>('http://localhost:3000/api/membres',data);
  }

  getMembres(){
    return this.http.get<Membres[]>('http://localhost:3000/api/membres');
  }

  saveAdresse(data: any){
    return this.http.post<likes[]>('http://localhost:3000/api/likes',data);
  }

  getAdress(likes:likes){
    return this.http.post<likes[]>('http://localhost:3000/api/likes/adresse',likes);
  }



  deletelike(id: any){
    return this.http.delete(`http://localhost:3000/api/likes/${id}`)
  }
}
