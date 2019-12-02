import { Injectable } from '@angular/core';
import { ServService } from 'src/app/services/serv.service';

import { VacantI, CareerI, selPostulantI } from '../../models/models.model';
import { HttpParams } from '@angular/common/http';

import { PostulantService } from './postulant.service';
import { ServiceService } from 'src/app/services/service.service';
import { RecruiterService } from './recruiter.service';


@Injectable({
  providedIn: 'root'
})
export class VacantService {

  private URL = "vacant/";

  constructor(private serv: ServService, private serv1: PostulantService, private servR: RecruiterService) { }

  Post(vacant: VacantI, job: number) {
    vacant.idJobPosition = job;
    console.log("Lo que envio realmente", vacant);
    return this.serv.POST(vacant, this.URL);
  }

  /**
   * This operations make it by Postulant
   * @param dat 
   */
  GetByCarrers(dat: CareerI[]) {
    let str: string = "";
    for (let i = 0; i < dat.length; i++) {
      if (i == dat.length - 1) {
        str += "" + dat[i].id;
      } else {
        str += dat[i].id + ",";
      }
    }
    console.log(str);
    //let params=new HttpParams().set('careers',str.toString());    
    return this.serv.GET(`${this.URL}forPostulant/${this.serv1.GetLocal().id}/?careers=${str}`);
  }

  /**
   * This operation make it by Recruiter
   * List of vacants without soft skills
   */
  GetPendingR() {
    return this.serv.GET(`${this.URL}pending/${this.servR.GetLocal().id}`);
  }
  /**
   * Applied vacants
   */
  Getvacants() {
    return this.serv.GET('vacant/applied/' + this.serv1.GetLocal().id);
  }

  GetPostulants(id: string) {
    return this.serv.GET('vacant/getPostulants/' + id);
  }
  /**
   * Get vacants in process for the recruiter 
   */
  GetInProcessR() {
    return this.serv.GET(`vacant/process/${this.servR.GetLocal().id}`);
  }

  /**
 * Post, aply vacant
 * @param idVacant id
 */
  PostVacantByPostulant(idVacant: number) {
    return this.serv.POST({ idPostulant: this.serv1.GetLocal().id, idVacant: idVacant }, `vacant/Apply/`);
  }

  /**
   * Get vacants in process by Recruiter
   */
  GetProcessRecruiter() {
    return this.serv.GET(`${this.URL}\process`)
  }

  /**
   * Reclutador selecciona a postulante
   * Tal vez haya problemas
   * @param dat 
   */
  PutSelPostulants(dat: selPostulantI) {
    return this.serv.PUT(dat, `${this.URL}\selectPostulants`)
  }
}

