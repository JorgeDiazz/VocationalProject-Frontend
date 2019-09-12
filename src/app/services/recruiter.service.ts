import { Injectable } from '@angular/core';
import { ServService } from './serv.service';
import { RecruiterI } from '../models/models.model';
 

@Injectable({
  providedIn: 'root'
})
export class  RecruiterService {

  constructor(private serv:ServService) { }
  
  /** CRUD */
  public insert(recruiter: RecruiterI) {    
    return this.serv.POST(recruiter, "person/registerR");
  }


  /** END CRUD */

  /** Queries */


  /** END Queries */



}
