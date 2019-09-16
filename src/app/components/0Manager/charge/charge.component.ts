import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalJobComponent } from './modal-job/modal-job.component';
import { ManagerService } from 'src/app/services/manager.service'; 
import { JobsI } from '../../../models/models.model';
import { ServiceService } from 'src/app/services/service.service';
@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {
  
   
  jobs:JobsI[];
  nitCompany:string;
  constructor(public dialog: MatDialog,private serv:ServiceService) {
    this.nitCompany=this.serv.getCompany().nit;
    this.getJobs(this.nitCompany);
   }

  ngOnInit() {
  }
 

  verModal() {
    const dialogRef = this.dialog.open(ModalJobComponent, {
      width: '650px',
      data:{nameEmpresa:"PRUEBA"}
    });

  dialogRef.afterClosed().subscribe(result => {
    this.getJobs(this.nitCompany);
  });
}

getJobs(nit:string){
//SERVICIO PARA TRAER CARGOS DE UNA EMPRESA
}
}
