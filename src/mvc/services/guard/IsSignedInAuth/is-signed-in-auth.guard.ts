import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInAuthGuard implements CanActivate {

  constructor(private authService: AuthorizationService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
  
}
