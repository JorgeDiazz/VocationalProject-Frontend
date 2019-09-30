import { Injectable } from '@angular/core'; 
import { ServService } from '../serv.service';
import { JobsI } from 'src/app/models/models.model';
@Injectable({
  providedIn: 'root'
})
export class JobPositionService {
  private URL="jobPosition/";

  constructor(private serv:ServService) { }

  /**
   * Register JobPosition
   * Receive a object of job position without nitCompany,
   * the nit will put in this method. 
   * @param job De la clase Job
   */
  Post(job:JobsI){      
    job.nitCompany=this.serv.getCompany().nit; 
    return this.serv.POST(job,this.URL);
  }
  /**
   * Get Jobpositions about the company.
   * return observable with data
   */
  GetAll(){
    return this.serv.GET(this.URL+this.serv.getCompany().nit);
  }
}
