import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { RecruiterI } from 'src/app/models/models.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { noWhiteSpaceValidato } from 'src/app/components/Validator/validators.validators';

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

  updateProfile(tip: number) {
    if (tip == 0) {
      this.update=true;
      this.form = new FormGroup({
        'name': new FormControl(this.recruiterProfile.name, [Validators.required, noWhiteSpaceValidato]),
        'email': new FormControl(this.recruiterProfile.email, Validators.required),
      })
    } else {
      this.update=false;
      this.updateRecruiter();
      this.getRecruiter();
    }
    
  }
  //PARA SERVICIO
  updateRecruiter(){

  }
  getRecruiter(){
    this.recruiterProfile=this.serv.Recruiter.GetLocal();
  }
}
