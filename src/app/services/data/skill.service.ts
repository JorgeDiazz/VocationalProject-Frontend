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
    this.serv.POST(skill,this.URL+"register");
  }

 /**
  * Get Skills
  * return Observable with data
  * @param i 0 to Hard and 1 to Soft
  */
  GetAll(i:number){
    if(i==0)
    return this.serv.GET(this.URL_Hard);
    
    return  this.serv.GET(this.URL_Soft); 
  } 
 
}
