import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material'
@Component({
  selector: 'app-modal-rec',
  templateUrl: './modal-rec.component.html',
  styleUrls: ['./modal-rec.component.css']
})
export class ModalRecComponent implements OnInit {

  form:FormGroup;
  constructor(public dialogRef: MatDialogRef<ModalRecComponent>) 
  {

    this.form=new FormGroup({
      'email':new FormControl('',[Validators.required
       ,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$') 
      ])
    })

   }

  ngOnInit() {
  }

  send(){
    this.form.markAllAsTouched();
    console.log(this.form);
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
      //Do something
    } 

  }

}
