import { Injectable } from '@angular/core';
import { ServService } from '../serv.service';
import { RecruiterI } from 'src/app/models/models.model';
import { AuthService } from '../session/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

  URL = "recruiter/";
  constructor(private serv: ServService,
    private auth: AuthService) { }


  /** 
  * Register recruiter,
  * receive Object Recruiter without nit of Company, 
  * the nit of company it will put in this method.
  * Return Observable 
  * @param recruiter Object
 */
  Post(recruiter: RecruiterI) {
    recruiter.nitCompany = this.serv.getCompany().nit;
    return this.serv.POST(recruiter, this.URL);
  }

/**
 * Update recruiter
 */
  Put(recruiter:RecruiterI){
    return this.serv.PUT(recruiter,this.URL);

  }
/**
 * Update Local recruiter
 */
  PutLocal(recruiter:RecruiterI){
    let dat: any = this.auth.getAuth();
    dat.id=recruiter.id;
    dat.name=recruiter.name;
    dat.nitCompany=recruiter.nitCompany;
    dat.email=recruiter.email;
    localStorage.setItem("auth",JSON.stringify(dat));
  }

  

  /**
   * Get recuirter's of the Company
   */
  GetAll() {
    return this.serv.GET(this.URL + this.serv.getCompany().nit);
  }

  /**
   * Get recruiters for view vacants number and postulant number
   */
  GetAllPlazas() {
    return this.serv.GET(this.URL + "recruiter/" + this.serv.getCompany().nit);
  }

/**
 * Post relation recruiter-vacant
 * @param idVacant id
 */
  PostVacant(idVacant:number){
    console.log(this.GetLocal().id);
    return this.serv.POST({idPerson:this.GetLocal().id,idVacant:idVacant} , `${this.URL}vacant/`);
  }

  /**
 * Get Recruiter in the local Storage
 * @return object
 */
  GetLocal() {
    let dat: RecruiterI = this.auth.getAuth();
    delete dat['token'];
    delete dat['type'];
     return dat;
  }
}
