import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalJobComponent } from './modal-job/modal-job.component';
@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }


  verModal() {
    const dialogRef = this.dialog.open(ModalJobComponent, {
      width: '350px'
    });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
}
