import { Injectable } from '@angular/core';
import { ServService } from 'src/app/services/serv.service';
import { VacantI } from '../../models/models.model';
import { PostulantService } from './postulant.service';
import { ServiceService } from 'src/app/services/service.service';

@Injectable({
  providedIn: 'root'
})
export class VacantService {

  private URL="vacant/";

  constructor(private serv:ServService,private serv1:PostulantService) { }

  Post(vacant:VacantI,job:number){      
    vacant.idJobPosition=job; 
    console.log("Lo que envio realmente",vacant);
    return this.serv.POST(vacant,this.URL);
  }

  Getvacants(){
    return this.serv.GET('vacant/applied/'+this.serv1.GetLocal().id);
  }
}