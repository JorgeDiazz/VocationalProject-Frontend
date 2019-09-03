import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-modal-vacant1',
  templateUrl: './modal-vacant1.component.html',
  styleUrls: ['./modal-vacant1.component.css']
})
export class ModalVacant1Component implements OnInit {
  form: FormGroup;
  constructor() { 
    this.form = new FormGroup({
      'number': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

}
