import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalJob1Component } from './modal-job1/modal-job1.component';
import { ChargeI } from 'src/app/models/models.model';
import { ServGlobalService } from 'src/app/services/serv-global.service';

@Component({
  selector: 'app-pending-vacancies',
  templateUrl: './pending-vacancies.component.html',
  styleUrls: ['./pending-vacancies.component.css']
})
export class PendingVacanciesComponent implements OnInit {

  charges:ChargeI[];
  constructor(public dialog: MatDialog,
    public serv:ServGlobalService) {
      this.charges=this.serv.getAllCharges();
     }

  ngOnInit() {
  }

  verModal(i:number,j:number) {
      const dialogRef = this.dialog.open(ModalJob1Component, {
        width: '350px',
        data:{ charge:this.charges[i], vacant:this.charges[i].vacant[j]}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
