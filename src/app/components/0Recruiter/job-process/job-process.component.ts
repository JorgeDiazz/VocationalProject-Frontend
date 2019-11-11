import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalPostulantComponent } from '../../0Manager/job-id/modal-postulant/modal-postulant.component';
import { ModalPostulantsComponent } from './modal-postulants/modal-postulants.component';
import { JobsI } from '../../../models/models.model';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { RecruiterService } from '../../../services/data/recruiter.service';

@Component({
  selector: 'app-job-process',
  templateUrl: './job-process.component.html',
  styleUrls: ['./job-process.component.css']
})
export class JobProcessComponent implements OnInit {

  charge:JobsI;
  constructor(public dialog: MatDialog,public routerA:ActivatedRoute,private serv:ServiceService) {
    this.routerA.params.subscribe(r=>{
    })
    this.serv.JobPosition.GetJobProcess(this.routerA.snapshot.paramMap.get('id')).subscribe(dat=>{
      this.charge=<any>dat.body;
      console.log(this.charge);
    })
   }

  ngOnInit() {
  }

  verModal() {
      const dialogRef = this.dialog.open(ModalPostulantComponent, {
        width: '350px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  verPostulants(){
    const dialogRef = this.dialog.open(ModalPostulantsComponent, {
      width: '750px'
    });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
  }
}
