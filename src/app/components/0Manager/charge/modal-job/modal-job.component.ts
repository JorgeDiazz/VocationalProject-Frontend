import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material'

import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';

@Component({
  selector: 'app-modal-job',
  templateUrl: './modal-job.component.html',
  styleUrls: ['./modal-job.component.css']
})
export class ModalJobComponent implements OnInit {

  charge = {
    name: "Junior Sistema",
    range: "1500-3444",
    desc: "hola hola hola",
    carrer: [
      { name: 'Ing. Sistemas' }
    ],
    strongSkill: [
      { name: "1" }
    ]

  }

  form:FormGroup;



  constructor(public dialogRef: MatDialogRef<ModalJobComponent>) {
    this.form=new FormGroup({
      'name':new FormControl('',Validators.required),
      'range':new FormControl('',Validators.required),
      'desc':new FormControl('',Validators.required),
      'carrer':new FormArray([
       new FormGroup({
         'name':new FormControl('',Validators.required)
       })
      ]),
      'strongSkill':new FormArray([
        new FormGroup({
          'name':new FormControl('',Validators.required)
        })
       ])
    })
  }



  ngOnInit() {
  }

  addCar() {
    this.charge.carrer.push({ name: "Other" });
  }
  removeCar(i: number) {
    this.charge.carrer.splice(i, 1);

  }

  addSkill() {
    this.charge.strongSkill.push({ name: "Other" });
  }
  removeSkill(i: number) {
    this.charge.strongSkill.splice(i, 1);

  }

  addCharge() {
    this.dialogRef.close(this.charge);
  }
}
