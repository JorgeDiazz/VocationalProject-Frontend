import { Component, OnInit } from '@angular/core';
import { ModalVacantComponent } from '../vacant/modal-vacant/modal-vacant.component';
import {MatDialog} from '@angular/material/dialog';  
import { VacantI } from 'src/app/models/models.model';
import { ServiceService } from '../../../services/service.service';
import { CareerI } from '../../../models/models.model';

@Component({
  selector: 'app-vacant',
  templateUrl: './vacant.component.html',
  styleUrls: ['./vacant.component.css']
})
export class VacantComponent implements OnInit {
 
  vacants:VacantI[];
  careers:CareerI[];
  constructor(public dialog: MatDialog,private serv:ServiceService ) {
    //SERVICIO DE OBTENER CARRERAS DE POSTULANTES PARA CAREERS
    this.verVacantes(this.careers);
   }

  ngOnInit() {
  }

  verModal(id:string) {
      const dialogRef = this.dialog.open(ModalVacantComponent, {
        width: '450px',
        data:id
      });

    dialogRef.afterClosed().subscribe(result => {
      this.verVacantes(this.careers);
    });
  }

  verVacantes(careers:CareerI[]){
    //SERVICIO PARA TRAER VACANTES POR CADA CARRERA DE POSTULANTE
  }
}
