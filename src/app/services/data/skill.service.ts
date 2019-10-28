import { Injectable } from '@angular/core';
import { ServService } from '../serv.service';
import { SkillI } from 'src/app/models/models.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
private URL="skill"
private URL_Hard="skill/Hard";
private URL_Soft="skill/Soft"

constructor(private serv:ServService) { }

  /**
   * Register Skill.
   * @param Skill Object
   */
  Post(skill:SkillI){ 
    console.log("Lo que envio realmente",skill); 
    this.serv.POST(skill,this.URL); 
  }

 /**
  * Get Skills
  * return Observable with data
  * @param i 0 to Hard and 1 to Soft
  */
  GetAll(i:number){
    if(i==0)
    return this.serv.GET(this.URL_Hard);
    
    return  this.serv.GET( `${this.URL_Soft}/${this.serv.getCompany().nit}`); 
  } 

  /**
   * Get all globals skill
   */
  GetALLGlobalSkill(){
    return this.serv.GET('skill/GlobalByCompany/'+this.serv.getCompany().nit);
  }

  PutGlobalSoft_Sof( newType:string,id:number){
    return this.serv.PUT({
      newType:newType,
      id:id,
      nitCompany: this.serv.getCompany().nit,
    },'skill/');
  }
 
}
