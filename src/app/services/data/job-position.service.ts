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
  constructor(private serv:ServService, private serv1:RecruiterService) { }

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

  GetJob(id:string){
    return this.serv.GET(this.URL+"job/"+id);
  }

  GetJobProcess(id:string){
   this.jobP.idJob=Number(id);
this.jobP.idRecruiter= this.serv1.GetLocal().id;
    return this.serv.POST(this.jobP,this.URL+"inprocess/");
  }
}
