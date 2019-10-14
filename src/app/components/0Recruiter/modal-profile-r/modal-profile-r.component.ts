import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { RecruiterI } from 'src/app/models/models.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { noWhiteSpace } from 'src/app/components/Validator/validators.validators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-profile-r',
  templateUrl: './modal-profile-r.component.html',
  styleUrls: ['./modal-profile-r.component.css']
})
export class ModalProfileRComponent implements OnInit {

  recruiterProfile:RecruiterI;
  form: FormGroup;
  update: boolean = false;

  constructor(private serv:ServiceService) { 
    this.getRecruiter();
  }

  ngOnInit() {
  }

  initForm(){
    this.form = new FormGroup({
      'id':new FormControl({ value: this.recruiterProfile.id, disabled: true }, Validators.required),
      'name': new FormControl(this.recruiterProfile.name,[Validators.required, noWhiteSpace]),
      'email': new FormControl(this.recruiterProfile.email, [Validators.required,noWhiteSpace, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    });
  }

  updateProfile(tip: number) {
    if (tip == 0) {
      this.update=true;
      this.initForm();
    } else {      
      let rec:RecruiterI=this.form.value;
      this.form.markAllAsTouched();
      if(this.form.valid){
      this.updateRecruiter(rec);}
        
    }
    
  }
  //PARA SERVICIO
  updateRecruiter(rec:RecruiterI){
    let ob:any={};    
    ob.id=this.recruiterProfile.id;
    
    if(rec.name!==this.recruiterProfile.name){
      ob.name=rec.name;
    } 
    if(rec.email!==this.recruiterProfile.email){
      ob.email=rec.email.trim();
    }
    this.serv.Recruiter.Put(ob).subscribe(dat=>{
      swal.fire('Actualización', 'Los datos fueron actualizados correctamente', 'success');      
      console.log(dat);
      let ob:any;
      ob=dat.body;
      this.serv.Recruiter.PutLocal(ob); 
      this.getRecruiter();
      this.update = false;
    })
  }
  getRecruiter(){
    this.recruiterProfile=this.serv.Recruiter.GetLocal();
  }
}
