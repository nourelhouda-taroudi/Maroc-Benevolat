import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { associations } from '../models/associations';
import { Post } from '../profile/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 

  apiUrl="http://localhost:5000/post";
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

   public getAssociation(): Observable<associations[]>{
    return this.http.get<associations[]>( 'http://localhost:3000/api/association/all');
}
}
