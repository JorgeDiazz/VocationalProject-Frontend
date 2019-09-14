import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material'

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ServGlobalService } from 'src/app/services/serv-global.service';
import {ThemePalette} from '@angular/material/core'; 
import { ServiceService } from 'src/app/services/service.service';
import { AreaI, CarrerI, SkillI } from 'src/app/models/models.model';
import { ChartRenderProps } from 'chart.js';

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
    {name: 'none', color: undefined},
    {name: 'Primary', color: 'primary'},
    {name: 'Accent', color: 'accent'},
    {name: 'Warn', color: 'warn'}
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
 nameEmpresa:string;
 areas:AreaI[];
 carrers:CarrerI[]=[{
  id:1,
  name:"Ing. Sistemas"
},
 {
   id:2,
   name:"Abogado"
 }];

 skillsHard:SkillI[]=[ 
   {
     id:3,
     name:"other",
     type:"hard"

   },
   {
     id:4,
     name:"other 2",
     type:"hard"
   }
   ]
 skillsHardSelected:SkillI[];  
 carrersSelected:CarrerI[];

  constructor(public dialogRef: MatDialogRef<ModalJobComponent>,
    public serv:ServiceService) {
       
    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'range1': new FormControl('', Validators.required),
      'range2': new FormControl('', Validators.required),
      'area':new FormControl('',Validators.required),
      'desc': new FormControl('', Validators.required),      
      'carrer':new FormControl(''),
      'newCarrer':new FormArray([
        new FormGroup({
          'name': new FormControl('')
        })
      ]),
      'hardSkill':new FormControl(''),
      'newHardSkill': new FormArray([
        new FormGroup({
          'name': new FormControl('')
        })
      ]),
      'newProcess': new FormArray([
        new FormGroup({
          'name': new FormControl('', Validators.required)
        })
      ])

    })
  }



  ngOnInit() {
    this.serv.company.getAreas().subscribe(dat=>{
      this.areas=<AreaI[]> dat.body;
      console.log(this.areas);
    });
    this.serv.company.getSkillsHard().subscribe(dat=>{
      this.skillsHard=<SkillI[]>dat.body;
    });
    this.serv.company.getCareers().subscribe(dat=>{
      this.carrers=<CarrerI[]>dat.body;
    })
    
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

  selectCarrer(e){ 
    this.carrersSelected=e;
  }
  selectSkill(e){
    this.skillsHardSelected=e;
  }



  addCar() {
    (<FormArray>this.form.get('newCarrer')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required)
      })
    )
  }
  removeCar(i: number) {
    (<FormArray>this.form.get('newCarrer')).removeAt(i);

  }

  addSkill() {
    //this.charge.strongSkill.push({ name: "Other" });
    (<FormArray>this.form.get('newHardSkill')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required)
      })
    )
  }
  removeSkill(i: number) {
    (<FormArray>this.form.get('newHardSkill')).removeAt(i);

  }

  addProcess(){
    (<FormArray>this.form.get('newProcess')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required)
      })
    )
   
  }
  removeProcess(i:number){
    (<FormArray>this.form.get('newProcess')).removeAt(i);
  }

}
