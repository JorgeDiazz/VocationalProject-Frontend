import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalJob1Component } from './modal-job1/modal-job1.component'; 
import { VacantI } from 'src/app/models/models.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-pending-vacancies',
  templateUrl: './pending-vacancies.component.html',
  styleUrls: ['./pending-vacancies.component.css']
})
export class PendingVacanciesComponent implements OnInit {
 
  pendingVacants: VacantI[];
  idRecruiter:string;
  constructor(public dialog: MatDialog,private serv:ServiceService ) {
      
      this.getPendingVacants();
     }

  ngOnInit() {
  }

  verModal(vacant:VacantI) {
      const dialogRef = this.dialog.open(ModalJob1Component, {
        width: '500px',
        data:{idJobPosition:vacant.idJobPosition,
          placesNumber:vacant.placesNumber,
          idVacant:vacant.id}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.getPendingVacants();
      }
    });
  }

  getPendingVacants(){
     //pedir vacantes por reclutador sin postulantes
     this.serv.Vacant.GetPendingR().subscribe(dat=>{
       this.pendingVacants=<VacantI[]>dat.body;
       console.log(this.pendingVacants);
     })
  }
}
