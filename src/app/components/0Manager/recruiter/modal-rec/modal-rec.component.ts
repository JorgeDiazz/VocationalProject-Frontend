import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material'
import { RecruiterI } from 'src/app/models/models.model';
import { ServiceService } from 'src/app/services/service.service';
@Component({
  selector: 'app-modal-rec',
  templateUrl: './modal-rec.component.html',
  styleUrls: ['./modal-rec.component.css']
})
export class ModalRecComponent implements OnInit {

  form:FormGroup;
  constructor(public dialogRef: MatDialogRef<ModalRecComponent>,
    private serv:ServiceService
    ) 
  {

    this.form=new FormGroup({
      'id':new FormControl('',[Validators.required,Validators.pattern('[0-9]{1,15}')]),
      'email':new FormControl('',[Validators.required
       ,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$') 
      ])
    })

   }

  ngOnInit() {
  }

  send(){
    this.form.markAllAsTouched();
    let recruiter:RecruiterI=Object.assign(this.form.value);
    recruiter.nitCompany=""; 
    recruiter.id=recruiter.id+""; 
    if(this.form.valid){
      this.serv.Recruiter.Post(recruiter).subscribe((dat)=>{
        console.log(dat); 
        this.dialogRef.close(recruiter);
        //MANEJAR ERRORES
      });
     
      //Do something
    } 

  }

}
