import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  constructor(private httpClient:HttpClient) { }
  url = environment.baseURL+'common/';
  uploadImage(data:FormData){

    return this.httpClient.post(`${this.url}upload`,data)
  }
  getImage(image:string){
    return `${this.url}${image}`
  }

}
