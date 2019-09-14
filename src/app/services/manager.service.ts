import { Injectable } from '@angular/core';
import { ChargeI, AreaI } from '../models/models.model';
import { HttpClient } from '@angular/common/http';
import { ServService } from './serv.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  charges:ChargeI[]=[];

  areaURL="area/"; // "area/id:" 

  constructor(public serv:ServService) {
    
   }

   /** AREAS */
   PostArea(area:AreaI){
     return this.serv.POST(area,`${this.areaURL}${area.nit_company}`);
   }

   GetAreas(nitCompany:String){
     return this.serv.GET(`${this.areaURL}${nitCompany}`);
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
