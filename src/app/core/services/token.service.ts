import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  
  //Enregitrement du Token et id dans le local Storage
  set(data: any) {
    const {access_token,user} = data;
    localStorage.setItem('id', user.id);
    localStorage.setItem('token', access_token);
  } 
  setId(id:string){
    localStorage.setItem('id', id);
  }

  handle(data:any) {
    this.set(data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getId() {
    return localStorage.getItem('id');
  }

  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  decode(payload:any) {
    return JSON.parse(atob(payload));
  }

  payload(token:any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }


  isValid() {
    const token = this.getToken();
    const id = this.getId();
    //console.log(id);

    if (token) {

      const payload = this.payload(token);
      //console.log(payload);
      
      if (payload) {
        return id == payload.sub;
      }
    }
    return false;
    
  }

  getInfos() {

    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      return payload ? payload : null;
    }

    return null
  }


  loggedIn() {
    return this.isValid();
  }
}
