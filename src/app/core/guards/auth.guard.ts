import { UserService } from './../services/user.service';
import { TokenService } from '../services/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private token: TokenService,
    private userService: UserService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.token.loggedIn()) {
        this.router.navigateByUrl('/auth/login');
        this.token.remove();
        this.userService.changeAuthStatus(false);
        return false;
      }
    return true;
  }
  
}
