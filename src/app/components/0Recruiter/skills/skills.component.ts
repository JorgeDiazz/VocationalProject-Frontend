import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { ModalCreateComponent } from './modal-create/modal-create.component';
import { softSkillI } from 'src/app/models/models.model';
import { ServGlobalService } from 'src/app/services/serv-global.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  softs:softSkillI[]=[];

  constructor(public dialog: MatDialog,
    public serv:ServGlobalService) {
      this.softs=this.serv.getSofts();
     }

  ngOnInit() {
  }

  verModalE() {
      const dialogRef = this.dialog.open(ModalEditComponent, {
        width: '350px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  verModalC(i:number) {
    const dialogRef = this.dialog.open(ModalCreateComponent, {
      width: '350px'
    });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      let soft:softSkillI={
        name:result.name,
        type:i
      }
      this.serv.addSoft(soft);
      this.softs=this.serv.getSofts();
    }
    console.log(`Dialog result: ${result}`);
    
  });
}
}
