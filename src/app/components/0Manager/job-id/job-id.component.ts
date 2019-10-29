import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalVacant1Component } from './modal-vacant1/modal-vacant1.component';
import { ModalPostulantComponent } from './modal-postulant/modal-postulant.component';
import { ActivatedRoute } from '@angular/router';  
import { JobsI } from 'src/app/models/models.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-job-id',
  templateUrl: './job-id.component.html',
  styleUrls: ['./job-id.component.css']
})
export class JobIdComponent implements OnInit {
 
  charge:JobsI;
  constructor(public dialog: MatDialog,
    public routerA:ActivatedRoute,private serv:ServiceService ) { 
      this.routerA.params.subscribe(r=>{
      })
      this.serv.JobPosition.GetJob(this.routerA.snapshot.paramMap.get('id')).subscribe(dat=>{
        this.charge=<any>dat.body;
        console.log(this.charge);
      })
    }

  ngOnInit() {
  }

  

  verModalV() {
    const dialogRef = this.dialog.open(ModalVacant1Component, {
      width: '350px',
      data:{job:this.charge.id}
    });

  dialogRef.afterClosed().subscribe(result => {
    if(result.number){ 
    } 
  });
}

verModalP() {

  const dialogRef = this.dialog.open(ModalPostulantComponent, {
    width: '450px',
    
  });

dialogRef.afterClosed().subscribe(result => {
  console.log(`Dialog result: ${result}`);
});
}
}
