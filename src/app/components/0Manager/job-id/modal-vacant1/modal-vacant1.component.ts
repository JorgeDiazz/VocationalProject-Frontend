import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material'
import { RecruiterI } from 'src/app/models/models.model';
import { ServiceService } from 'src/app/services/service.service';
@Component({
  selector: 'app-modal-vacant1',
  templateUrl: './modal-vacant1.component.html',
  styleUrls: ['./modal-vacant1.component.css']
})
export class ModalVacant1Component implements OnInit {
  recruiters: RecruiterI[];
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
  constructor(public dialogRef: MatDialogRef<ModalVacant1Component>,public serv: ServiceService) { 
    this.form = new FormGroup({
      'number': new FormControl('', Validators.required),
      'recruiter': new FormControl('')
    });

    this.serv.Recruiter.GetAll().subscribe(dat => {
      this.recruiters = <RecruiterI[]>dat.body;
    })
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
