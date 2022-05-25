import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { associations } from '../../../models/associations';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private http : HttpClient) { }

  getAssociation(){
    
    return this.http.get<associations[]>('http://localhost:3000/api/association/all');
  
  }


}
