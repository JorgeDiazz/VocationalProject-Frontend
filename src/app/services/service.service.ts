import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ServService } from './serv.service';
import { UserI, AuthI, CompanyI } from '../models/models.model';
import { RecruiterService } from './recruiter.service';
import { AuthService } from './auth.service';
import { ManagerService } from './manager.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(public login: LoginService, public recruiter: RecruiterService,
    public auth: AuthService, public company: ManagerService) { 
  }

  getCompany():CompanyI {
    let dat: any = this.auth.getAuth();
    let nit: string = "Sin NIT";
    let name: string = "Sin NOMBRE se DEBE al reclutador";
    if (dat.nit) {
      nit = dat.nit;
      name = dat.name;
    }
    if (dat.nitCompany) {
      nit = dat.nitCompany;
    }
    let company: CompanyI = {
      nit: nit,
      name: name
    }
    return company;
  }
 
}
