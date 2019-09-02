import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material'

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-modal-job',
  templateUrl: './modal-job.component.html',
  styleUrls: ['./modal-job.component.css']
})
export class ModalJobComponent implements OnInit {

  // charge = {
  //   name: "Junior Sistema",
  //   range: "1500-3444",
  //   desc: "hola hola hola",
  //   carrer: [
  //     { name: 'Ing. Sistemas' }
  //   ],
  //   strongSkill: [
  //     { name: "1" }
  //   ]

  // }

  form: FormGroup;
 
  constructor(public dialogRef: MatDialogRef<ModalJobComponent>) {
    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'range': new FormControl('', Validators.required),
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
  }

  save() {
    this.form.markAllAsTouched();
    console.log(this.form);
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
