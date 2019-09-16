import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'; 
import { ThemePalette } from '@angular/material/core';
import { ServiceService } from 'src/app/services/service.service';
import { AreaI, CareerI, SkillI, RecruiterI } from 'src/app/models/models.model';
import { ChartRenderProps } from 'chart.js';
import { CompanyI } from '../../../../models/models.model';
import swal, { SweetAlertType } from 'sweetalert2';

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
      'range1': 10,
      'range2': 20,
      'area': 1, //ID Area
      'desc': "descripcion",
      'carrer': [{ id: 2, name: 's' }],          //Se puede enviar vacio => se envia carrer o new carrer
      'newCarrer': [{ name: 'nuevaCarrera' }],   //Se puede enviar vacio => se envia carrer o new carre
      'hardSkill': [{id:1, name:'xx'}],          //Se puede enviar vacio => se envia hardSkill o newHardSkill
      'newHardSkill':[{name:'xx'}],              //Se puede enviar vacio => se envia hardSkill o newHardSkill
      'newProcess': [{name:'sd'}],
      'recruiter':[{id:'xx'}],   //Es opcional, se puede enviar vacio
      'available':40             //Es opcional, sepuede enviar vacio  
    }
*/
    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'range1': new FormControl('', Validators.required),
      'range2': new FormControl('', Validators.required),
      'area': new FormControl('', Validators.required),
      'desc': new FormControl('', Validators.required),
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
      'newProcess': new FormArray([
        new FormGroup({
          'name': new FormControl('', Validators.required)
        })
      ]),
      'recruiter': new FormControl(''),
      'available': new FormControl('')

    })
  }



  ngOnInit() {
    this.serv.company.getAreas().subscribe(dat => {
      this.areas = <AreaI[]>dat.body;
      console.log(this.areas);
    });
    this.serv.company.getSkillsHard().subscribe(dat => {
      this.skillsHard = <SkillI[]>dat.body;
    });
    this.serv.company.getCareers().subscribe(dat => {
      this.careers = <CareerI[]>dat.body;
    })
    this.serv.company.getRecruiters().subscribe(dat => {
      this.recruiters = <RecruiterI[]>dat.body;
    })

    this.nameEmpresa= this.serv.getCompany();
  }

  save() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      alert(parseInt(this.form.get('range1').value)<=parseInt(this.form.get('range2').value));
      if(parseInt(this.form.get('range1').value)>=parseInt(this.form.get('range2').value)){
        swal.fire('Datos erroneos',"El rango de salario es incorrecto", 'error');
      }else{
        if(this.form.get('career').value.length==0 && this.form.get('newCareer').value.length==0){
          swal.fire('Datos imcompletos',"Debe ingresar carreras", 'error');
        }else if(this.form.get('hardSkill').value.length==0 && this.form.get('newHardSkill').value.length==0){
          swal.fire('Datos imcompletos',"Debe ingresar habilidades", 'error');
        }else{
          if(this.form.get('recruiter').value.length!=0 && this.form.get('available').value==null){
            swal.fire('Datos imcompletos',"Debe ingresar los puestos disponibles", 'error');
          }else if(this.form.get('recruiter').value.length==0 && this.form.get('available').value!=null){
            swal.fire('Datos imcompletos',"Debe ingresar al menos un reclutador", 'error');
          }else{
            this.dialogRef.close(this.form.value);
          }
        }


        
        
      }
      

    } else {
      console.log("invalidoooo")
    }
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
        (<FormArray>this.form.get('newProcess')).push(
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
        (<FormArray>this.form.get('newProcess')).removeAt(i);
        break;
    }
  }



}
