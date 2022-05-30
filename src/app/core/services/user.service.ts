import { TokenService } from './token.service';
import { associations } from './../../models/associations';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  constructor(
    private readonly http : HttpClient,
    private readonly token:TokenService
  ) { }
    url = environment.baseURL+'user/';
  signIn(payload: {email:string,password:string}){
    return this.http.post(`${this.url}signIn`,payload)
  }
  signUp(payload: any){
    console.log(payload);
    return this.http.post(`${this.url}signUp`,payload)
  }
  changeAuthStatus(value:boolean){
    this.loggedIn.next(value);
  }
}
