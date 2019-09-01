import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalVacant1Component } from './modal-vacant1/modal-vacant1.component';
import { ModalPostulantComponent } from './modal-postulant/modal-postulant.component';

@Component({
  selector: 'app-job-id',
  templateUrl: './job-id.component.html',
  styleUrls: ['./job-id.component.css']
})
export class JobIdComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }


  verModalV() {
    const dialogRef = this.dialog.open(ModalVacant1Component, {
      width: '350px'
    });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

verModalP() {
  const dialogRef = this.dialog.open(ModalPostulantComponent, {
    width: '450px'
  });

dialogRef.afterClosed().subscribe(result => {
  console.log(`Dialog result: ${result}`);
});
}
}
