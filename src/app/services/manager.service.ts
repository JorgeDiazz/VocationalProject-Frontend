import { Injectable } from '@angular/core';
import { ChargeI, AreaI, RecruiterI } from '../models/models.model';
import { HttpClient } from '@angular/common/http';
import { ServService } from './serv.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  charges:ChargeI[]=[];

  private areaURL="area/"; // "area/id:" 
  private skillHardURL="skill/Hard";
  private careerURL="career/";
  private nitCompany="";
  /**
   * Cualquier petición que requiera nitCompany, se debe utilizar el método gitNitCompany()
   */


  constructor(public serv:ServService) {
    if(this.serv.servAuth.getAuth()){
    }
   }


 
   /** AREAS */
   postArea(area:AreaI){
     this.getNitCompany();
     return this.serv.POST(area,`${this.areaURL}${area.nit_company}`);
   }

   getAreas(){ 
     this.getNitCompany();
     return this.serv.GET(`${this.areaURL}${this.nitCompany}`);
   }

   /** END AREAS */

   /** SKILLS */
 
   getSkillsHard(){
     return this.serv.GET( `${this.skillHardURL}` );
   } 

   /** END SKILLS */

   
   /** CAREERS */

   getCareers(){
    return this.serv.GET( `${this.careerURL}` );
   }

    /** END CAREERS */

   /** Recruiter */

   postRecruiter(recruiter:RecruiterI){
     this.getNitCompany();
     recruiter.nitCompany=this.nitCompany; 
     return this.serv.POST(recruiter,'recruiter/');
   }

   getRecruiters(){
     this.getNitCompany();
     return  this.serv.GET(`recruiter/${this.nitCompany}`);
   }
   
   /** END Recruiter */


 
   /** De la MVP */
  getAllCharges(){
    this.load();
    return this.charges;

  }

  getCharge(id:number){    
    this.load();
    if(this.charges.length-1>=id){
      return this.charges[id];
    }


  }
  addCharge(charge:ChargeI){ 
    this.load();
    charge.id_=this.charges.length;
    this.charges.push(charge);
    this.save();
  }

  load(){
    if(localStorage.getItem('charges')){
      this.charges=JSON.parse(localStorage.getItem('charges'));   
    } 
  }
  save(){
    localStorage.setItem('charges',JSON.stringify(this.charges));
  }
  /** De la MVP */

  private  getNitCompany(){    
    this.nitCompany=this.serv.getCompany().nit;
   }

}
