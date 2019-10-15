import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalJobComponent } from './modal-job/modal-job.component'; 
import { JobsI } from '../../../models/models.model';
import { ServiceService } from 'src/app/services/service.service';
@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {
  
   
  jobs:JobsI[]=[];
  nitCompany:string;
  constructor(public dialog: MatDialog,private serv:ServiceService) {
    this.nitCompany=this.serv.Company.GetLocal().nit;
   
   }

  ngOnInit() {
    this.getJobs();
  }
 

  verModal() {
    const dialogRef = this.dialog.open(ModalJobComponent, {
      width: '650px',
      data:{nameEmpresa:"PRUEBA"}
    });

  dialogRef.afterClosed().subscribe(result => {
    this.getJobs();
  });
}

getJobs(){
this.serv.JobPosition.GetAll().subscribe(dat=>{
  
  this.jobs=<any>dat.body;
  console.log(this.jobs);
})
}
}
