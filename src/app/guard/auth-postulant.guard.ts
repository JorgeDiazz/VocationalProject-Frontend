import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs'; 
import { AuthService } from '../services/session/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPostulantGuard implements CanActivate {
  constructor(private serv:AuthService, private route:Router ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.serv.getAuth());
      if(this.serv.isAuth("POSTULANT")){
        return true;
      }
      this.route.navigateByUrl("/login");
      return false;
  }
  
}
