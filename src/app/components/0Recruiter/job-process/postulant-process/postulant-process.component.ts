import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ServiceService } from 'src/app/services/service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PostulantI, SkillI } from 'src/app/models/models.model';
import { ProcessI } from '../../../../models/models.model';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper'; 
import {MatIconModule} from '@angular/material/icon';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-postulant-process',
  templateUrl: './postulant-process.component.html',
  styleUrls: ['./postulant-process.component.css']
})
export class PostulantProcessComponent implements OnInit {

  isLinear = false;
  Form:FormGroup;
  skillsY:SkillI[]=[]
  skillsN:SkillI[]=[]
  status={}
  pos ={
    name: "Andres Ramiro",
    process:[
      {id:0,
       name:"Entrevista Reclutador",
       description:"entrevista en la compañía con el reclutador encargado de la vacante",
       status:0,
       observ:""},
       {id:1,
       name:"Evaluación psicotécnica",
       description:"Evaluación psicotécnica al postulante dentro de la compañía",
       status:0,
       observ:""},
       {id:2,
       name:"Exámenes médicos",
       description:"Examen médico al postulante",
       status:0,
       observ:""}
    ],
    skill:[
      {id:3,
       name:"Honestidad",
       status:0},
       {id:4,
       name:"Trabajo en equipo",
       status:1},
       {id:5,
       name:"Comunicación",
       status:0}
    ]
  }
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private serv:ServiceService,private _formBuilder: FormBuilder) { 
   for (let i = 0; i < this.pos.process.length; i++) {
     this.status[this.pos.process[i].id]=this.pos.process[i].status
   }
   for (let i = 0; i < this.pos.skill.length; i++) {
    this.status[this.pos.skill[i].id]=this.pos.skill[i].status
    if(this.pos.skill[i].status==0){
       let skill={
          id:this.pos.skill[i].id,
          name:this.pos.skill[i].name
       }
       this.skillsN.push(skill)
    }
    if(this.pos.skill[i].status==1){
      let skill={
        id:this.pos.skill[i].id,
        name:this.pos.skill[i].name
     }
     this.skillsY.push(skill)
    }
  }
  }

   ngOnInit() {
  }

  calificar(id:number,note:number,type:string){
     this.status[id]=note;
     if(type=="skill"){
       if(note==0){
        for (let i = 0; i < this.skillsY.length; i++) {
          if(this.skillsY[i].id==id){
             this.skillsN.push(this.skillsY[i])
             delete this.skillsY[i]
          }
        }
        console.log(this.skillsY)
       }
       if(note==1){
        for (let i = 0; i < this.skillsN.length; i++) {
          if(this.skillsN[i].id==id){
             this.skillsY.push(this.skillsY[i])
             delete this.skillsN[i]
          }
        }
        console.log(this.skillsN)
      }
      
     }
  }

  drop(event: CdkDragDrop<SkillI[]>,note:number): void {
    console.log(event)

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousContainer.data[event.previousIndex])
      this.calificar(event.previousContainer.data[event.previousIndex].id,note,"skill")
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    //console.log(this.Globalsofts);
    //console.log(this.softs);
  }

}
