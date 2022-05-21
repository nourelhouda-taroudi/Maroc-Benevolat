import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/profile/models/post';
import { associations } from '../models/association';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private http : HttpClient) { }

  getSelectedPost(){
    
    return this.http.get<associations[]>('http://localhost:3000/api/association');
  
  }


}
