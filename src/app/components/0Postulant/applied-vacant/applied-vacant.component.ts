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
  vacantsInProcess:VacantI[]=[];
  vacantsWait:VacantI[]=[];
  vacantsFail:VacantI[]=[];
  InProcess:number;
  Wait:number;
  Fail:number;
  constructor(private serv:ServiceService) {
    this.InProcess=0;
    this.Wait=0;
    this.Fail=0;
    this.getVacants();
    this.getList();
   }

  ngOnInit() {
   
  }

  getVacants(){
    this.serv.Vacant.Getvacants().subscribe(dat=>{
  
      this.vacants=<any>dat.body;
      this.getList();
    })
  }

  getList(){
    for (let i = 0; i < this.vacants.length; i++) {
      if(this.vacants[i].state==0){
        this.Wait+=1;
        this.vacantsWait.push(this.vacants[i]);
      }
      if(this.vacants[i].state==1){
        this.InProcess+=1;
        this.vacantsInProcess.push(this.vacants[i]);
      }
      if(this.vacants[i].state==2){
        this.Fail+=1;
        this.vacantsFail.push(this.vacants[i]);
      }
    }
  }

}
