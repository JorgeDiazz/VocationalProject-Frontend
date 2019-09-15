import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { ModalCreateComponent } from './modal-create/modal-create.component';
import { softSkillI } from 'src/app/models/models.model';
import { ServiceService } from '../../../services/service.service';
import { SkillI } from '../../../models/models.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {


  softs:SkillI[];
  Globalsofts:SkillI[];

  constructor(public dialog: MatDialog,
    public serv:ServiceService) {
      this.verSkills();
     }

  ngOnInit() {

  }

  verModalE() {
      const dialogRef = this.dialog.open(ModalEditComponent, {
        width: '350px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.verSkills();
      
    });
  }

  verModalC() {
    const dialogRef = this.dialog.open(ModalCreateComponent, {
      width: '350px'
    });

   

 /* dialogRef.afterClosed().subscribe(result => {
    if(result){
      let soft:softSkillI={
        name:result.name,
        type:1
      }
      this.serv.addSoft(soft);
      this.softs=this.serv.getSofts();
    }
    console.log(`Dialog result: ${result}`);
    
  });*/
}

verSkills(){
  this.serv.company.getSkillsSoft().subscribe(dat=>{
    this.softs=<SkillI[]>dat.body;
  });
 }
}
