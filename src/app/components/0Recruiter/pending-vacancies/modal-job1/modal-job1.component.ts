import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-modal-job1',
  templateUrl: './modal-job1.component.html',
  styleUrls: ['./modal-job1.component.css']
})
export class ModalJob1Component implements OnInit {
  form: FormGroup;
  constructor() { 

    this.form = new FormGroup({
      'process': new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

}
