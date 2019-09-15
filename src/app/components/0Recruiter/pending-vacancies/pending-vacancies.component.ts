import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalJob1Component } from './modal-job1/modal-job1.component'; 

@Component({
  selector: 'app-pending-vacancies',
  templateUrl: './pending-vacancies.component.html',
  styleUrls: ['./pending-vacancies.component.css']
})
export class PendingVacanciesComponent implements OnInit {
 
  constructor(public dialog: MatDialog ) {
      
     }

  ngOnInit() {
  }

  verModal(i:number,j:number) {
      const dialogRef = this.dialog.open(ModalJob1Component, {
        width: '350px',
        data:{ charge:"other", vacant:"other"}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
