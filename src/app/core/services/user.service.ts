import { TokenService } from './token.service';
import { associations } from './../../models/associations';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminInter } from 'src/app/models/admin';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  constructor(
    private readonly http: HttpClient,
    private readonly token: TokenService
  ) {}
  url = environment.baseURL + '/user/';
  signIn(payload: { email: string; password: string }) {
    return this.http.post(`${this.url}signIn`, payload);
  }
  signUp(payload: any) {
    console.log(payload);
    return this.http.post(this.url+'signUp', payload);
  }
  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }
  forgetPassword(email: string) {
    return this.http.post(`${this.url}forget-password?email=${email}`, {});
  }
  otpValidation(code: string, email: string) {
    return this.http.post(
      `${this.url}otpValidation?email=${email}&code=${code}`,
      {}
    );
  }
  resetPassword(email: string, newPassword: string) {
    const params = new HttpParams();
    params.append('email', email);
    params.append('password', newPassword);
    return this.http.put(
      `${this.url}resetPassword?email=${email}&password=${newPassword}`,
      {}
    );
  }
  findOneEmail(email: string): Observable<AdminInter> {
    return this.http.get<AdminInter>(`${this.url}/${email}`);
  }
}
