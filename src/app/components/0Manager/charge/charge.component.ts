import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalJobComponent } from './modal-job/modal-job.component';
import { ManagerService } from 'src/app/services/manager.service';
import { ChargeI } from 'src/app/models/models.model'; 
import { ServGlobalService } from 'src/app/services/serv-global.service';
@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {
  
  

  charges:ChargeI[]=[];

  constructor(public dialog: MatDialog, public serv:ServGlobalService ) {
    this.charges=this.serv.getAllCharges();
   }

  ngOnInit() {
  }
 

  verModal() {
    const dialogRef = this.dialog.open(ModalJobComponent, {
      width: '650px',
      data:{nameEmpresa:this.serv.getCompanie().name}
    });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
     // console.log(`Dialog result: ${JSON.stringify(result)}`);
     this.serv.addCharge(result);
     this.charges=this.serv.getAllCharges();
     //console.log(JSON.stringify(this.charges));
    }
   
  });
}
}
