import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ServGlobalService } from 'src/app/services/serv-global.service';
import { ThemePalette } from '@angular/material/core';
import { ServiceService } from 'src/app/services/service.service';
import { AreaI, CarrerI, SkillI, RecruiterI } from 'src/app/models/models.model';
import { ChartRenderProps } from 'chart.js';
import { CompanyI } from '../../../../models/models.model';

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
  availableColors: ChipColor[] = [
    { name: 'none', color: undefined },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];
  states = new FormControl();
  statesList: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];




  form: FormGroup;
  nameEmpresa:CompanyI;
  areas: AreaI[];
  carrers: CarrerI[] = [{
    id: 1,
    name: "Ing. Sistemas"
  },
  {
    id: 2,
    name: "Abogado"
  }];

  skillsHard: SkillI[] = [
    {
      id: 3,
      name: "other",
      type: "hard"

    },
    {
      id: 4,
      name: "other 2",
      type: "hard"
    }
  ]
  skillsHardSelected: SkillI[];
  carrersSelected: CarrerI[];
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
      'carrer': new FormControl(''),
      'newCarrer': new FormArray([
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
      this.carrers = <CarrerI[]>dat.body;
    })
    this.serv.company.getRecruiters().subscribe(dat => {
      this.recruiters = <RecruiterI[]>dat.body;
    })

    this.nameEmpresa= this.serv.getCompany();
  }

  save() {
    this.form.markAllAsTouched();


    console.log(this.form.value);
    //console.log(JSON.stringify(this.form.value));

    if (this.form.valid) {
      this.dialogRef.close(this.form.value);

    } else {
      console.log("invalidoooo")
    }
  }

  selectChange(e, type: number) {
    switch (type) {
      case 1:
        this.carrersSelected = e;
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
        (<FormArray>this.form.get('newCarrer')).push(
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
        (<FormArray>this.form.get('newCarrer')).removeAt(i);
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
