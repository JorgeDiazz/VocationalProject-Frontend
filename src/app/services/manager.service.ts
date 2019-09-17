import { Injectable } from '@angular/core';
import { AreaI, RecruiterI, JobsI } from '../models/models.model';
import { HttpClient } from '@angular/common/http';
import { ServService } from './serv.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
 

  private areaURL="area/"; // "area/id:" 
  private skillHardURL="skill/Hard";
  private careerURL="career/";
  
  /**
   * Cualquier petición que requiera nitCompany, se debe utilizar el método gitNitCompany()
   */


  constructor(public serv:ServService) {
    if(this.serv.servAuth.getAuth()){
    }
   }


   postJobPosition(job:JobsI){
      
     job.nitCompany=this.getNitCompany();
     console.log(JSON.stringify(job));
     return this.serv.POST(job,'jobPosition/');
   }
   getJobPosition(){
     return this.serv.GET('jobPosition/'+this.getNitCompany());
   }
 
   /** AREAS */
   postArea(area:AreaI){
      
     return this.serv.POST(area,`${this.areaURL}${area.nit_company}`);
   }

   getAreas(){ 
     
     return this.serv.GET(`${this.areaURL}${this.getNitCompany()}`);
   }

   /** END AREAS */

   /** SKILLS */
 
   getSkillsHard(){
     return this.serv.GET( `${this.skillHardURL}` );
   } 

   private skillSoftURL="skill/Soft";
   getSkillsSoft(){
     return this.serv.GET( `${this.skillSoftURL}` );
   } 

   /** CAREERS */

   getCareers(){
    return this.serv.GET( `${this.careerURL}` );
   }

    /** END CAREERS */

   /** Recruiter */

   postRecruiter(recruiter:RecruiterI){
     
     recruiter.nitCompany=this.getNitCompany();
     return this.serv.POST(recruiter,'recruiter/');
   }

   getRecruiters(){
      
     return  this.serv.GET(`recruiter/${this.getNitCompany()}`);
   }
   
   /** END Recruiter */


  
  private  getNitCompany(){    
    return this.serv.getCompany().nit;
   }

}
