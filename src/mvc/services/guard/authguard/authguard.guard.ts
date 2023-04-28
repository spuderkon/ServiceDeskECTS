import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private authService: AuthorizationService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      let url: string = state.url;
      let availableRoles: string[] = route.data['role']
      let currentRole: string = this.authService.getRole();
      console.log('av roles ',availableRoles);
      console.log('cur role ',currentRole);
      return this.checkUserAccess(availableRoles,currentRole);
    }
    this.router.navigate(['/auth']);
    return false;
  }



  checkUserAccess(availableRoles: string[], currentRole: string): boolean {
    if (availableRoles.includes(currentRole)) {
      return true
    }
    return false;
  }
}
