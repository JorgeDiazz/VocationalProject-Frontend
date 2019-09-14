import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material'

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ServGlobalService } from 'src/app/services/serv-global.service';
import {ThemePalette} from '@angular/material/core'; 
import { ServiceService } from 'src/app/services/service.service';
import { AreaI } from 'src/app/models/models.model';

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

  constructor(public dialogRef: MatDialogRef<ModalJobComponent>,
    public serv:ServiceService) {
       
    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'range': new FormControl('', Validators.required),
      'area':new FormControl('',Validators.required),
      'desc': new FormControl('', Validators.required),
      'carrer': new FormArray([
        new FormGroup({
          'name': new FormControl('', Validators.required)
        })
      ]),
      'strongSkill': new FormArray([
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

  addCar() {
    (<FormArray>this.form.get('carrer')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required)
      })
    )
  }
  removeCar(i: number) {
    (<FormArray>this.form.get('carrer')).removeAt(i);

  }

  addSkill() {
    //this.charge.strongSkill.push({ name: "Other" });
    (<FormArray>this.form.get('strongSkill')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required)
      })
    )
  }
  removeSkill(i: number) {
    (<FormArray>this.form.get('strongSkill')).removeAt(i);

  }

}
