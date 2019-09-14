import { Injectable } from '@angular/core';
import { ChargeI, AreaI } from '../models/models.model';
import { HttpClient } from '@angular/common/http';
import { ServService } from './serv.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  charges:ChargeI[]=[];

  private areaURL="area/"; // "area/id:" 
  constructor(public serv:ServService) {
    
   }

   /** AREAS */
   postArea(area:AreaI){
     return this.serv.POST(area,`${this.areaURL}${area.nit_company}`);
   }

   getAreas(){
     let nitCompany=<any> this.serv.servAuth.getAuth().nit;
     console.log(`${this.areaURL}${nitCompany}`) 
     return this.serv.GET(`${this.areaURL}${nitCompany}`);
   }

   /** SKILLS */
  private skillHardURL="skill/Hard";
   getSkillsHard(){
     return this.serv.GET( `${this.skillHardURL}` );
   } 

   private careerURL="career/";
   /** CAREERS */

   getCareers(){
    return this.serv.GET( `${this.careerURL}` );
   }

   /**   */
 
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

}
