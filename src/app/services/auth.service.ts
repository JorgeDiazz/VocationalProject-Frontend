import { Injectable } from '@angular/core';
import { AuthI } from '../models/models.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuth(type:string):boolean{
    let auth:AuthI=JSON.parse(localStorage.getItem("auth"));
    if(auth){
      return (auth.type==type);
    }else{
      return false;
    }
 
  }

  saveAuth(header:HttpHeaders,type:string){
    let token=header.get("token");
    let ob:AuthI={
      token:token,
      type:type
    }
    localStorage.clear();
    localStorage.setItem("auth",JSON.stringify(ob));
  }

  getAuth(){
    return JSON.parse(localStorage.getItem("auth"));
  }
}
