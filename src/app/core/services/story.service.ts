import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Story } from 'src/app/models/story';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  apiUrl = 'http://localhost:3000/api/story';
  constructor(private http: HttpClient) {}
  findAll() {
    return this.http.get<Story[]>(this.apiUrl);
  }

  delete(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  persist(story: any) {
    return this.http.post<Story>(this.apiUrl, story);
  }
  likes(id: any, like: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, { like: !like });
  }
  update(story: any) {
    return this.http.put(`${this.apiUrl}/${story.id}`, story);
  }
  getAssociationStories(associationId: number){
    return this.http.get<Story[]>(`this.apiUrl/association/${associationId}`);
  }
}
