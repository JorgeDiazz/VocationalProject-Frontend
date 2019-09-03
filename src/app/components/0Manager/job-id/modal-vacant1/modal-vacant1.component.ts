import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material'
@Component({
  selector: 'app-modal-vacant1',
  templateUrl: './modal-vacant1.component.html',
  styleUrls: ['./modal-vacant1.component.css']
})
export class ModalVacant1Component implements OnInit {
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<ModalVacant1Component>) { 
    this.form = new FormGroup({
      'number': new FormControl('', Validators.required)
    });
  }

  addVacant(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }
  ngOnInit() {
  }

}
