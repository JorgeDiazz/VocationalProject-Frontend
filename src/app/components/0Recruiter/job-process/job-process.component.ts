import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalPostulantComponent } from '../../0Manager/job-id/modal-postulant/modal-postulant.component';
import { ModalPostulantsComponent } from './modal-postulants/modal-postulants.component';
import { JobsI } from '../../../models/models.model';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { RecruiterService } from '../../../services/data/recruiter.service';
import { PostulantI } from 'src/app/models/models.model';
import { PostulantProcessComponent } from './postulant-process/postulant-process.component';

@Component({
  selector: 'app-job-process',
  templateUrl: './job-process.component.html',
  styleUrls: ['./job-process.component.css']
})
export class JobProcessComponent implements OnInit {

  charge: any;
  constructor(public dialog: MatDialog, public routerA: ActivatedRoute, private serv: ServiceService) {
    this.getJobProcess()
  }

  ngOnInit() {
  }

  getJobProcess() {
    this.routerA.params.subscribe(r => {
    })
    console.log("id " + this.routerA.snapshot.paramMap.get('id'))
    this.serv.JobPosition.GetJobProcess(this.routerA.snapshot.paramMap.get('id').split(":")[0], this.routerA.snapshot.paramMap.get('id').split(":")[1]).subscribe(dat => {
      this.charge = <any>dat.body;
      console.log(this.charge);
    })
  }

  verModal(postulant: PostulantI) {
    const dialogRef = this.dialog.open(ModalPostulantComponent, {
      width: '350px',
      data: { id: postulant.id, name: postulant.name, recruiter: this.serv.Recruiter.GetLocal().name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  verModalPrueba() {
    const dialogRef = this.dialog.open(PostulantProcessComponent, {
      width: '750px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  verPostulants() {
    const dialogRef = this.dialog.open(ModalPostulantsComponent, {
      width: '750px',
      data: {
        id: this.routerA.snapshot.paramMap.get('id').split(":")[0],
        idVacant: this.charge.vacant.id,
        postulants: [],
        idRv: this.charge.id_rv
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getJobProcess();
      }
    });
  }
}
