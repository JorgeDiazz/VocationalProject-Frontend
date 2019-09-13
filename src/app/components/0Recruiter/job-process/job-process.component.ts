import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalPostulantComponent } from '../../0Manager/job-id/modal-postulant/modal-postulant.component';
import { ModalPostulantsComponent } from './modal-postulants/modal-postulants.component';

@Component({
  selector: 'app-job-process',
  templateUrl: './job-process.component.html',
  styleUrls: ['./job-process.component.css']
})
export class JobProcessComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

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
