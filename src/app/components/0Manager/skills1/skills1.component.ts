import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { ModalCreateComponent } from './modal-create/modal-create.component';
import { ServiceService } from '../../../services/service.service';
import { SkillI } from '../../../models/models.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-skills1',
  templateUrl: './skills1.component.html',
  styleUrls: ['./skills1.component.css']
})
export class Skills1Component implements OnInit {


  softs: SkillI[] = [];
  Globalsofts: SkillI[] = [];
  nit: string;
  constructor(public dialog: MatDialog,
    public serv: ServiceService) {
    this.nit = this.serv.Recruiter.GetLocal().nitCompany;
    this.verSkills();
    this.verGlobalSkills(this.nit);

  }

  ngOnInit() {

  }

  verModalE(soft: SkillI) {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '350px',
      data: { id: soft.id, name: soft.name }
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

  verSkills() {
    this.serv.Skill.GetAll(1).subscribe(dat => {
      this.softs = <SkillI[]>dat.body;
    });
  }

  verGlobalSkills(nit: string) {
    //SERVICIO VER HABILIDADES GOBLALES DE LA EMPRESA
    this.serv.Skill.GetALLGlobalSkill().subscribe(data => {
      this.Globalsofts = <SkillI[]>data.body;
    })
  }

  /**
   * Metodo para pasar de una habilidad a otra
   * Falta quitar Error 417!!
   * @param event 
   *  
  */

  drop(event: CdkDragDrop<SkillI[]>, type: string): void {


    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousContainer.data[event.previousIndex])
      this.serv.Skill.PutGlobalSoft_Sof(type, event.previousContainer.data[event.previousIndex].id).subscribe(d => {
        console.log(d);
      });
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    //console.log(this.Globalsofts);
    //console.log(this.softs);
  }

}
