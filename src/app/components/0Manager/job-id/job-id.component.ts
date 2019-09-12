import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalVacant1Component } from './modal-vacant1/modal-vacant1.component';
import { ModalPostulantComponent } from './modal-postulant/modal-postulant.component';
import { ActivatedRoute } from '@angular/router';
import { ChargeI, VacantI } from 'src/app/models/models.model';
import { ManagerService } from 'src/app/services/manager.service';
import { ServGlobalService } from 'src/app/services/serv-global.service';

@Component({
  selector: 'app-job-id',
  templateUrl: './job-id.component.html',
  styleUrls: ['./job-id.component.css']
})
export class JobIdComponent implements OnInit {

  charge:ChargeI;

  constructor(public dialog: MatDialog,
    public routerA:ActivatedRoute,
    public serv:ServGlobalService) { 
      this.routerA.params.subscribe(r=>{
        this.charge=serv.getCharge( r['id'] );
        console.log(JSON.stringify(this.charge));

      })
    }

  ngOnInit() {
  }


  verModalV() {
    const dialogRef = this.dialog.open(ModalVacant1Component, {
      width: '350px'
    });

  dialogRef.afterClosed().subscribe(result => {
    if(result.number){
     let vacant:VacantI={
       startDate:(Date.now())+"",
       extender:false,
       placeNumber:result.number,

     }
      this.serv.addVacant(this.charge.id_,vacant);
    } 
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
