import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Modal1Component } from './components/modal1/modal1.component';

@Component({
  selector: 'app-app-postulant',
  templateUrl: './app-postulant.component.html',
  styleUrls: ['./app-postulant.component.css']
})
export class AppPostulantComponent implements OnInit {

  constructor(public dialog:MatDialog) {

   }

  ngOnInit() {
  }

  verModal(){
    const dialogRef = this.dialog.open( Modal1Component);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
