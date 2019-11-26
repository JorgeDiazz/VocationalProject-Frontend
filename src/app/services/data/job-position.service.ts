import { Injectable } from '@angular/core'; 
import { ServService } from '../serv.service';
import { JobsI } from 'src/app/models/models.model';
import { RecruiterService } from './recruiter.service';
import { JobProcI } from '../../models/models.model';
@Injectable({
  providedIn: 'root'
})
export class JobPositionService {
  private URL="jobPosition/";

  jobP: JobProcI;
  constructor(private serv:ServService, private serv1:RecruiterService) { 
    this.jobP={ idVacant: 0, idRecruiter: '',idJob:0 }
  }

  /**
   * Register JobPosition
   * Receive a object of job position without nitCompany,
   * the nit will put in this method. 
   * @param job De la clase Job
   */
  Post(job:JobsI){      
    job.nitCompany=this.serv.getCompany().nit; 
    console.log("Lo que envio realmente",job);
    return this.serv.POST(job,this.URL);
  }
  /**
   * Get Jobpositions about the company.
   * return observable with data
   */
  GetAll(){
    return this.serv.GET(this.URL+this.serv.getCompany().nit);
  }

  /**
   * Post soft skills.
   */
  PostSoft(idJob:number,job:JobsI){
    return this.serv.POST(job,`${this.URL}job/${idJob}/soft/`);
  }

  GetJob(id:string){
    return this.serv.GET(this.URL+"job/"+id);
  }

  GetJobProcess(id:string,id2:string){
   this.jobP.idVacant=Number(id);
   this.jobP.idJob=Number(id2);
   this.jobP.idRecruiter= this.serv1.GetLocal().id;
    return this.serv.GET(this.URL+"inprocess/${this.jobP}/${this.jobP.idRecruiter}");
  }
}
