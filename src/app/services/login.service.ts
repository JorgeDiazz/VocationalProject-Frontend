import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserI, AuthI } from '../models/models.model';
import { ServService } from './serv.service'; 
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private serv: ServService,private router:Router) {
  }

  login(user: UserI) {
    return this.serv.POST(user, "login/", true);
    
  }

  logOut(){    
    localStorage.removeItem("auth");  
    this.router.navigateByUrl("/login");   
  }

 
  
}
