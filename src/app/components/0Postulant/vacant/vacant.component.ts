import { Component, OnInit } from '@angular/core';
import { ModalVacantComponent } from '../vacant/modal-vacant/modal-vacant.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-vacant',
  templateUrl: './vacant.component.html',
  styleUrls: ['./vacant.component.css']
})
export class VacantComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  verModal() {
      const dialogRef = this.dialog.open(ModalVacantComponent, {
        width: '450px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
