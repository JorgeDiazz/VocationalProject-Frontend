import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { ModalCreateComponent } from './modal-create/modal-create.component'; 
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
  nit:string;
  constructor(public dialog: MatDialog,
    public serv:ServiceService) {
      this.nit=this.serv.Recruiter.GetLocal().nitCompany;
      this.verSkills();
      this.verGlobalSkills(this.nit);
     }

  ngOnInit() {

  }

  verModalE(soft:SkillI) {
      const dialogRef = this.dialog.open(ModalEditComponent, {
        width: '350px',
        data: {id: soft.id, name:soft.name}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.verSkills();
      this.verGlobalSkills(this.nit);
    });
  }

  verModalC() {
    const dialogRef = this.dialog.open(ModalCreateComponent, {
      width: '350px',
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.verSkills();
      this.verGlobalSkills(this.nit);
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
  this.serv.Skill.GetAll(1).subscribe(dat=>{
    this.softs=<SkillI[]>dat.body;
  });
 }

 verGlobalSkills(nit:string){
  //SERVICIO VER HABILIDADES GOBLALES DE LA EMPRESA
 }
}
