import { Component, OnInit } from '@angular/core';
import { ModalRecComponent } from './modal-rec/modal-rec.component';
import { MatDialog } from '@angular/material/dialog';
import { RecruiterI } from '../../../models/models.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {

  recruiters: RecruiterI[];
  nitCompany: string;
  constructor(public dialog: MatDialog, private serv: ServiceService) {
    this.nitCompany = this.serv.Company.GetLocal().nit;
    this.getRecruiters();
  }

  ngOnInit() {
  }
  verModal() {
    const dialogRef = this.dialog.open(ModalRecComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getRecruiters();
      }
    });
  }

  getRecruiters() {
    this.serv.Recruiter.GetAllPlazas().subscribe((dat) => {
      this.recruiters = <RecruiterI[]>dat.body;
      console.log(dat.body);
    },
      (error) => {
        console.log("no hacer nada");
      })
  }

}
