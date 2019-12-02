import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ServiceService } from 'src/app/services/service.service';
import { PostulantI, selPostulantI } from '../../../../models/models.model';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-postulants',
  templateUrl: './modal-postulants.component.html',
  styleUrls: ['./modal-postulants.component.css']
})
export class ModalPostulantsComponent implements OnInit {

  listChecked: boolean[];
  postulants: PostulantI[];
  form: FormGroup;
  selPostulants: selPostulantI;

  cantidadSel: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private serv: ServiceService,
    public dialogRef: MatDialogRef<ModalPostulantsComponent>) {
    console.log(data);
    this.selPostulants = <selPostulantI>data;

    this.getPostulants()

  }

  ngOnInit() {
  }

  getPostulants() {
    this.serv.Vacant.GetPostulants(this.data.id).subscribe(data => {
      this.postulants = <PostulantI[]>data.body;
      this.listChecked = new Array<boolean>(this.postulants.length);

    })
  }
  listaPostulantes(index: number) {
    if (!this.listChecked[index]) {
      this.cantidadSel++;
    } else {
      this.cantidadSel--;
    }
    this.listChecked[index] = !this.listChecked[index];
    console.log(this.listChecked[index], index);
  }

  seleccionar() {
    this.selPostulants.postulants = [];
    for (let i = 0; i < this.postulants.length; i++) {

      if (this.listChecked[i]) {
        this.selPostulants.postulants.push(this.postulants[i].id);
      }
    }
    console.log(this.selPostulants);
    this.serv.Vacant.PutSelPostulants(this.selPostulants).subscribe(dat => {
      Swal.fire('', 'Postulantes seleccionados correctamente', 'success');
      this.dialogRef.close(true);
    })
  }

}
