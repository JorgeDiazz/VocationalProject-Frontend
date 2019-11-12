import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceService } from 'src/app/services/service.service';
import { JobsI, VacantI } from 'src/app/models/models.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-vacant',
  templateUrl: './modal-vacant.component.html',
  styleUrls: ['./modal-vacant.component.css']
})
export class ModalVacantComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalVacantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Job:JobsI,vacant:VacantI },
    public serv: ServiceService) {
      console.log(data.Job);
     }

  ngOnInit() {
  }
  aplicarVacante(){
    this.serv.Vacant.PostVacantByPostulant(this.data.vacant.id).subscribe((dat)=>{
      Swal.fire('Aplicar vacante','Correcto','success');       
      this.dialogRef.close(true);
    })
  }
  
}
