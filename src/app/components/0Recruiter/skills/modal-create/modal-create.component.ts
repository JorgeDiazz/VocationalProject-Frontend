import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef} from '@angular/material'
@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent implements OnInit {
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<ModalCreateComponent>) { 

    this.form = new FormGroup({
      'name': new FormControl('', Validators.required)
    });
  }


  
crear(){
  this.form.markAsTouched();
  if(this.form.valid){
    this.dialogRef.close(this.form.value);

  }
}

  ngOnInit() {
  }

}
