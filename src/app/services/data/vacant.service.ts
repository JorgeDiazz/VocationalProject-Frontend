import { Injectable } from '@angular/core';
import { ServService } from 'src/app/services/serv.service';
import { VacantI } from '../../models/models.model';

@Injectable({
  providedIn: 'root'
})
export class VacantService {

  private URL="vacant/";

  constructor(private serv:ServService) { }

  Post(vacant:VacantI,job:number){      
    vacant.idJobPosition=job; 
    console.log("Lo que envio realmente",vacant);
    return this.serv.POST(vacant,this.URL);
  }
}
