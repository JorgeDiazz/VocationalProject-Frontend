import { Component, OnInit } from '@angular/core';
import { ModalVacantComponent } from '../vacant/modal-vacant/modal-vacant.component';
import {MatDialog} from '@angular/material/dialog';
import { ChargeI } from 'src/app/models/models.model';
import { ServGlobalService } from 'src/app/services/serv-global.service';

@Component({
  selector: 'app-vacant',
  templateUrl: './vacant.component.html',
  styleUrls: ['./vacant.component.css']
})
export class VacantComponent implements OnInit {

  charges:ChargeI[];
  constructor(public dialog: MatDialog,public serv:ServGlobalService) {
    this.charges=this.serv.getAllCharges();
   }

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
