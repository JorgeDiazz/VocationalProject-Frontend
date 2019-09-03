import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent implements OnInit {
  form: FormGroup;
  constructor() { 

    this.form = new FormGroup({
      'name': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

}
