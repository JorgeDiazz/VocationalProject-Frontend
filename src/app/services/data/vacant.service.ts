import { Injectable } from '@angular/core';
import { ServService } from 'src/app/services/serv.service';
 
import { VacantI, CareerI } from '../../models/models.model';
import { HttpParams } from '@angular/common/http';
 
import { PostulantService } from './postulant.service';
import { ServiceService } from 'src/app/services/service.service';
import { RecruiterService } from './recruiter.service';
 

@Injectable({
  providedIn: 'root'
})
export class VacantService {

  private URL="vacant/";

  constructor(private serv:ServService,private serv1:PostulantService,private servR:RecruiterService) { }

  Post(vacant:VacantI,job:number){      
    vacant.idJobPosition=job; 
    console.log("Lo que envio realmente",vacant);
    return this.serv.POST(vacant,this.URL);
  }

 /**
  * This operations make it by Postulant
  * @param dat 
  */
  GetByCarrers(dat:CareerI[]){
    let str:string="";
     for(let i=0; i<dat.length; i++){
      if(i==dat.length-1){
        str+=""+dat[i].id;
      }else{
        str+=dat[i].id+",";
      } 
     }
     console.log(str);
    //let params=new HttpParams().set('careers',str.toString());    
     return this.serv.GET(`${this.URL}forPostulant/?careers=${str}`);
  }

  /**
   * This operation make it by Recruiter
   * List of vacants without soft skills
   */
  GetPendingR(){
    return this.serv.GET(`${this.URL}pending/${this.servR.GetLocal().id}` );
  }
 
  Getvacants(){
    return this.serv.GET('vacant/applied/'+this.serv1.GetLocal().id);
  }
}
 
