import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { associations } from 'src/app/models/associations';
import { likes } from 'src/app/models/likes';
import { Membres } from 'src/app/models/membre';
import { SuppInter } from 'src/app/models/suppression';
import { Post } from '../../models/post';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl = 'http://localhost:3000/api/post';
  constructor(private http: HttpClient) {}
  findAll(params: string | undefined) {
    return this.http.get<Post[]>(this.apiUrl + params);
  }
  delete(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  persist(post: Post) {
    console.log({post});
    
    return this.http.post<Post>(this.apiUrl, post);
  }
  likes(id: any, like: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, { like: !like });
  }
  update(post: any) {
    return this.http.put(`${this.apiUrl}/${post.id}`, post);
  }

  getAssociation() {
    return this.http.get<associations[]>(
      'http://localhost:3000/api/association/all'
    );
  }

  saveDemande(data: any) {
    return this.http.post<SuppInter[]>(
      'http://localhost:3000/api/suppression',
      data
    );
  }

  ajoutMembre(data: any) {
    return this.http.post<Membres[]>('http://localhost:3000/api/membres', data);
  }

  getMembres() {
    return this.http.get<Membres[]>('http://localhost:3000/api/membres');
  }

  saveAdresse(data: any) {
    return this.http.post<likes[]>('http://localhost:3000/api/likes', data);
  }

  getAdress(likes: likes) {
    return this.http.post<likes[]>(
      'http://localhost:3000/api/likes/adresse',
      likes
    );
  }

  getAssociationById(id: number): Observable<associations> {
    return this.http.get<associations>(
      `http://localhost:3000/api/association/${id}`
    );
  }

  getAssociationPosts(associationId: number) {
    return this.http.get<Post[]>(`${this.apiUrl}/association/${associationId}`);
  }
  deletelike(id: any) {
    return this.http.delete(`http://localhost:3000/api/likes/${id}`);
  }

  getMembreById(data:Membres){
    return this.http.post<Membres[]>(`http://localhost:3000/api/membres/find`,data);
  }
 
  updateMembre(membre: any,id:number) : Observable<Membres>{
    return this.http.put<Membres>(`http://localhost:3000/api/membres/${id}`, membre);
  }
  deleteMembre(id: any) {
    return this.http.delete(`http://localhost:3000/api/membres/${id}`);
  }
  postSignal(data:any){
    return this.http.post(`http://localhost:3000/api/signaler`,data);
  }
  getSignal(){
    this.http.get(`http://localhost:3000/api/signaler`)
  }
  deleteSignal(id:number){
    this.http.delete(`http://localhost:3000/api/signaler/${id}`)
  }
}
