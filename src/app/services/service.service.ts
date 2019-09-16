import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ServService } from './serv.service';
import { UserI, AuthI, CompanyI, PostulantI } from '../models/models.model';
import { RecruiterService } from './recruiter.service';
import { AuthService } from './auth.service';
import { ManagerService } from './manager.service';
import { PostulantService } from './postulant.service';
import { RecruiterI } from 'src/app/models/models.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(public login: LoginService, public recruiter: RecruiterService,
    public auth: AuthService, public company: ManagerService,
    public postulant:PostulantService) { 
  }

  getCompany():CompanyI {
    let dat: any = this.auth.getAuth();
    console.log(dat);
    let nit:string=dat.nit;
    let name:string=dat.name;
    let email:string=dat.email;
    let phone:number=parseInt(dat.phone);
    let address:string=dat.address;
      let company: CompanyI = {
        nit: nit,
        name: name,
        address:address,
        phone:phone,
        email:email
      }
    
    return company;
  }

  getRecruiter():RecruiterI {
    let dat: any = this.auth.getAuth();
    let id:string=dat.id;
    let name:string=dat.name;
    let nitCompany:string=dat.nitCompany;
    let email:string=dat.email;
    let recruiter: RecruiterI = {
      id: id,
      name: name,
      nitCompany:nitCompany,
      email:email
    }
    
    return recruiter;
  }

  getPostulant():PostulantI {
    let dat: any = this.auth.getAuth();
    let id:string=dat.id;
    let name:string=dat.name;
    let email:string=dat.email;
    let postulant:PostulantI={
      id: id,
      name: name,
      email:email
    }
    return postulant;
  }
 
}
