import { Component, OnInit } from '@angular/core';
import { VacantI } from '../../../models/models.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-in-process',
  templateUrl: './in-process.component.html',
  styleUrls: ['./in-process.component.css']
})
export class InProcessComponent implements OnInit {

  processVacant: VacantI[]; 
  constructor(private serv: ServiceService) { 
    this.getProcessVacant();
  }

  ngOnInit() {
  }

  /**
   * //SERVICIO DE VACANTES POR RECLUTADOR CON POSTULANTES 
   * @param id 
   */
  getProcessVacant() {
    this.serv.Vacant.GetInProcessR().subscribe(dat => {
      this.processVacant = <VacantI[]>dat.body;
      console.log(this.processVacant);
    });

  }
}
