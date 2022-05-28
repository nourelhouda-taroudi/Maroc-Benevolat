import { associations } from './../../models/associations';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(
    private readonly http : HttpClient
  ) { }
    url = environment.baseURL+'user/';
  signIn(payload: {email:string,password:string}){
    return this.http.post(`${this.url}signIn`,payload)
  }
  signUp(payload: any){
    console.log(payload);
    return this.http.post(`${this.url}signUp`,payload)
  }
}
