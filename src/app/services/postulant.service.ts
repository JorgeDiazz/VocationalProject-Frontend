import { Injectable } from '@angular/core';
import { ServService } from './serv.service';
import { PostulantI } from '../models/models.model';

@Injectable({
  providedIn: 'root'
})
export class PostulantService {

  constructor(public serv:ServService) { }

  postPostulant(postulante:PostulantI){
    return this.serv.POST(postulante,"postulant/");
  }
}
