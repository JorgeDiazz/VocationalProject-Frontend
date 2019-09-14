import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ServService } from './serv.service';
import { UserI, AuthI } from '../models/models.model';
import { RecruiterService } from './recruiter.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService  {
  constructor(public login:LoginService,public recruiter:RecruiterService,
    public auth:AuthService ) {  
      // let authPerson:AuthI={
      //   token:"sdfsdf",
      //   type:"COMPANY",
      //   //type:"COMPANY"
      //   //type:"POSTULANT"
      //   //type:"RECRUITER"
      // }   
      // localStorage.clear();
      // localStorage.setItem("auth",JSON.stringify(authPerson));
  }
 
}
