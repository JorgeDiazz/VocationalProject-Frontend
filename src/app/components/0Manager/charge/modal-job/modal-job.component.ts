import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'; 
import { ThemePalette } from '@angular/material/core';
import { ServiceService } from 'src/app/services/service.service';
import { AreaI, CareerI, SkillI, RecruiterI, JobsI } from 'src/app/models/models.model';
import { ChartRenderProps } from 'chart.js';
import { CompanyI } from '../../../../models/models.model';
import swal, { SweetAlertType } from 'sweetalert2';
//import { ConsoleReporter } from 'jasmine';
//import { ConsoleReporter } from 'jasmine';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-modal-job',
  templateUrl: './modal-job.component.html',
  styleUrls: ['./modal-job.component.css']
})
export class ModalJobComponent implements OnInit {

  form: FormGroup;
  nameEmpresa:CompanyI;
  areas: AreaI[];
  careers: CareerI[];
  skillsHard: SkillI[];
  skillsHardSelected: SkillI[];
  careersSelected: CareerI[];
  recruiters: RecruiterI[];
  recruitersSelected: RecruiterI[];

  constructor(public dialogRef: MatDialogRef<ModalJobComponent>,
    public serv: ServiceService) {
/*
    let dt = {
      'name': "xxx",
      'salaryMin': 10,
      'salaryMax': 20,
      'idArea': 1, //ID Area
      'description': "descripcion",
      'carrer': [{ id: 2, name: 's' }],          //Se puede enviar vacio => se envia carrer o new carrer
      'newCarrer': [{ name: 'nuevaCarrera' }],   //Se puede enviar vacio => se envia carrer o new carre
      'hardSkill': [{id:1, name:'xx'}],          //Se puede enviar vacio => se envia hardSkill o newHardSkill
      'newHardSkill':[{name:'xx'}],              //Se puede enviar vacio => se envia hardSkill o newHardSkill
      'process': [{name:'sd'}],
      'recruiter':[{id:'xx'}],   //Es opcional, se puede enviar vacio
      'placeNumber':40             //Es opcional, sepuede enviar vacio  
    }
*/
    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'salaryMin': new FormControl('', Validators.required),
      'salaryMax': new FormControl('', Validators.required),
      'idArea': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'career': new FormControl(''),
      'newCareer': new FormArray([
        new FormGroup({
          'name': new FormControl('')
        })
      ]),
      'hardSkill': new FormControl(''),
      'newHardSkill': new FormArray([
        new FormGroup({
          'name': new FormControl('')
        })
      ]),
      'process': new FormArray([
        new FormGroup({
          'name': new FormControl('', Validators.required)
        })
      ]),
      'recruiter': new FormControl(''),
      'placeNumber': new FormControl('')

    })
  }



  ngOnInit() { 
    this.serv.Area.GetAll().subscribe(dat => {
      this.areas = <AreaI[]>dat.body;     
      this.serv.Skill.GetAll(0).subscribe(dat => {
        this.skillsHard = <SkillI[]>dat.body;
        this.serv.Career.GetAll().subscribe(dat => {
          this.careers = <CareerI[]>dat.body;
          this.serv.Recruiter.GetAll().subscribe(dat => {
            this.recruiters = <RecruiterI[]>dat.body;
          })
        })
      });
    });
    this.nameEmpresa= this.serv.Company.GetLocal();
  }

  save() {
    this.form.markAllAsTouched();
   console.log(this.form);
   console.log(this.form.value); 
    if (this.form.valid) {      
      //alert(parseInt(this.form.get('salaryMin').value)<=parseInt(this.form.get('salaryMax').value));
      if(parseInt(this.form.get('salaryMin').value)>=parseInt(this.form.get('salaryMax').value)){
        swal.fire('Datos erroneos',"El rango de salario es incorrecto", 'error');
      }else{
        if( (this.form.get('career').value=="" || this.form.get('career').value.length==0 ) &&  this.form.get('newCareer').value[0].name==""){
          swal.fire('Datos imcompletos',"Debe ingresar carreras", 'error');
        }else if( (this.form.get('hardSkill').value=="" || this.form.get('hardSkill').value.length==0)   && this.form.get('newHardSkill').value[0].name==""){
          swal.fire('Datos imcompletos',"Debe ingresar habilidades", 'error');
        }else{
          if( (this.form.get('recruiter').value!="" || this.form.get('recruiter').value.length!=0) && this.form.get('placeNumber').value==""){
            swal.fire('Datos imcompletos',"Debe ingresar los puestos disponibles", 'error');
         }else if( (this.form.get('recruiter').value=="" || this.form.get('recruiter').value.length==0 ) && this.form.get('placeNumber').value!=""){
            swal.fire('Datos imcompletos',"Debe ingresar al menos un reclutador", 'error');
          }else{
            let jobPosition:JobsI=this.obJobI(this.form.value);
       
            this.serv.JobPosition.Post(jobPosition).subscribe(dat=>{

            })
             //this.dialogRef.close(this.form.value);
          }
        }
      
        
      }
      

    } else {
      console.log("invalidoooo")
    }
  }

  obJobI(value:any){
      if(value.career=="")
        value.career=[];
      if(value.hardSkill=="")
        value.hardSkill=[]
      if(value.recruiter=="")
        value.recruiter=[];
      if(value.newCareer[0].name=="")
        value.newCareer.splice(0,1);
      if(value.newHardSkill[0].name=="")
        value.newHardSkill.splice(0,1);
      let pos:JobsI=value;
      
     return  pos;
  }

  selectChange(e, type: number) {
    switch (type) {
      case 1:
        this.careersSelected = e;
        break;
      case 2:
        this.skillsHardSelected = e;
        break;
      case 3:
        this.recruitersSelected = e;
        break;
    }
  }


  addOption(type: number) {
    switch (type) {
      case 1:
        (<FormArray>this.form.get('newCareer')).push(
          new FormGroup({
            'name': new FormControl('', Validators.required)
          })
        )
        break;
      case 2:
        (<FormArray>this.form.get('newHardSkill')).push(
          new FormGroup({
            'name': new FormControl('', Validators.required)
          })
        )
        break;
      case 4:
        (<FormArray>this.form.get('process')).push(
          new FormGroup({
            'name': new FormControl('', Validators.required)
          })
        )
        break;
    }
  }
  removeOption(type: number, i: number) {
    switch (type) {
      case 1:
        (<FormArray>this.form.get('newCareer')).removeAt(i);
        break;
      case 2:
        (<FormArray>this.form.get('newHardSkill')).removeAt(i);
        break;
      case 4:
        (<FormArray>this.form.get('process')).removeAt(i);
        break;
    }
  }



}
