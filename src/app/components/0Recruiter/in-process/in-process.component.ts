import { Component, OnInit } from '@angular/core';
import { VacantI } from '../../../models/models.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-in-process',
  templateUrl: './in-process.component.html',
  styleUrls: ['./in-process.component.css']
})
export class InProcessComponent implements OnInit {

  processVacant:VacantI[];
  id:string;
  constructor(private serv:ServiceService) {
    this.id=this.serv.getRecruiter().id;
   }

  ngOnInit() {
  }

  getProcessVacant(id:string){
   //SERVICIO DE VACANTES POR RECLUTADOR CON POSTULANTES 
  }
}
