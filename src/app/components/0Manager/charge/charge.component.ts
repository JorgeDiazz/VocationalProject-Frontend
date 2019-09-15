import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalJobComponent } from './modal-job/modal-job.component';
import { ManagerService } from 'src/app/services/manager.service'; 
@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {
  
   

  constructor(public dialog: MatDialog,  ) {
    
   }

  ngOnInit() {
  }
 

  verModal() {
    const dialogRef = this.dialog.open(ModalJobComponent, {
      width: '650px',
      data:{nameEmpresa:"PRUEBA"}
    });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
     
    }
   
  });
}
}
