import { Signaler } from './../../models/signaler';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { associations } from 'src/app/models/associations';
import { likes } from 'src/app/models/likes';
import { Membres } from 'src/app/models/membre';
import { SuppInter } from 'src/app/models/suppression';
import { Post } from '../../models/post';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl = environment.baseURL;
  constructor(private http: HttpClient) {}
  findAll(params: string | undefined) {
    return this.http.get<Post[]>(this.apiUrl+'/post' + params);
  }
  delete(id: any) {
    return this.http.delete(`${this.apiUrl}/post/${id}`);
  }
  persist(post: Post) {
    console.log({post});
    
    return this.http.post<Post>(this.apiUrl+'/post', post);
  }
 
  update(post: any) {
    return this.http.put(`${this.apiUrl}/post/${post.id}`, post);
  }

  getAssociation() {
    return this.http.get<associations[]>(
      this.apiUrl+'/association/all'
    );
  }

  saveDemande(data: any) {
    return this.http.post<SuppInter[]>(
      this.apiUrl+'/suppression',
      data
    );
  }

  ajoutMembre(data: any) {
    return this.http.post<Membres[]>(this.apiUrl+'/membres', data);
  }

  getMembres() {
    return this.http.get<Membres[]>(this.apiUrl+'/membres');
  }

  saveAdresse(data: any) {
    return this.http.post<likes[]>(this.apiUrl+'/likes', data);
  }

  getAdress(likes: likes) {
    return this.http.post<likes[]>(
     this.apiUrl+'/likes/adresse',
      likes
    );
  }

  getAssociationById(id: number): Observable<associations> {
    return this.http.get<associations>(
      `${this.apiUrl}/association/${id}`
    );
  }

  getAssociationPosts(associationId: number) {
    return this.http.get<Post[]>(`${this.apiUrl}/association/${associationId}`);
  }
  deletelike(id: any) {
    return this.http.delete(`${this.apiUrl}/likes/${id}`);
  }

  getMembreById(data:Membres){
    return this.http.post<Membres[]>(`${this.apiUrl}/membres/find`,data);
  }
 
  updateMembre(membre: any,id:number) : Observable<Membres>{
    return this.http.put<Membres>(`${this.apiUrl}/membres/${id}`, membre);
  }
  deleteMembre(id: any) {
    return this.http.delete(`${this.apiUrl}/membres/${id}`);
  }
  postSignal(data:any){
    return this.http.post(`${this.apiUrl}/signaler`,data);
  }
  getSignal():Observable<Signaler[]>{
    return this.http.get<Signaler[]>(`${this.apiUrl}/signaler`);
  }
  deleteSignal(id:number){
    this.http.delete(`${this.apiUrl}/signaler/${id}`)
  }
}
