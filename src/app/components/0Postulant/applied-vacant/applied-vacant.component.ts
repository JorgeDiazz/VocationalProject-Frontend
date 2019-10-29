import { Component, OnInit } from '@angular/core';
import { ModalVacantComponent } from '../vacant/modal-vacant/modal-vacant.component';
import { VacantI } from '../../../models/models.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-applied-vacant',
  templateUrl: './applied-vacant.component.html'
})
export class AppliedVacantComponent implements OnInit {

  vacants:VacantI[]=[];
  constructor(private serv:ServiceService) {
   }

  ngOnInit() {
    this.getVacants();
  }

  getVacants(){
    this.serv.Vacant.Getvacants().subscribe(dat=>{
  
      this.vacants=<any>dat.body;
      console.log(this.vacants);
    })
  }

}
