import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material' 
@Component({
  selector: 'app-modal-job1',
  templateUrl: './modal-job1.component.html',
  styleUrls: ['./modal-job1.component.css']
})
export class ModalJob1Component implements OnInit {
  form: FormGroup; 

  constructor(public dialogRef: MatDialogRef<ModalJob1Component>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
    

    this.form = new FormGroup({
      'skills' :new FormArray([
        new FormGroup({
          'id':new FormControl('',Validators.required)
        })
      ]),
      'process': new FormControl('', Validators.required),
    });
  }

  difundir() {
    this.form.markAsTouched();
    if (this.form.valid) {
      this.dialogRef.close();
    }
  }
  ngOnInit() {
  }

  addCar() {
    (<FormArray>this.form.get('skills')).push(
      new FormGroup({
        'id': new FormControl('', Validators.required)
      })
    )
  }
  removeCar(i: number) {
    (<FormArray>this.form.get('skills')).removeAt(i);

  }

  changeCity(e,i:number){
    console.log(e.target.value);
 console.log(( <FormGroup> (<FormArray>this.form.get('skills')).get(''+i) ).setValue({
   id:e.target.value
 }))

 console.log(( <FormGroup> (<FormArray>this.form.get('skills')).get(''+i) ).getRawValue())
 console.log(this.form.get('skills'));
  }
}
