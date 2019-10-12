import { Component, OnInit } from '@angular/core';
import { PostulantI } from '../../../models/models.model';
import { ServiceService } from '../../../services/service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { noWhiteSpaceValidato } from 'src/app/components/Validator/validators.validators';

@Component({
  selector: 'app-modal-profile-p',
  templateUrl: './modal-profile-p.component.html',
  styleUrls: ['./modal-profile-p.component.css']
})
export class ModalProfilePComponent implements OnInit {

  postulantProfile:PostulantI;
  form: FormGroup;
  update: boolean = false;

  constructor(private serv:ServiceService) {
    this.getPostulant();
   }

  ngOnInit() {
  }

  updateProfile(tip: number) {
    if (tip == 0) {
      this.update=true;
      this.form = new FormGroup({
        'name': new FormControl(this.postulantProfile.name, [Validators.required, noWhiteSpaceValidato]),
        'email': new FormControl(this.postulantProfile.email, Validators.required)
      })
    } else {
      this.update=false;
      this.updatePostulant();
      this.getPostulant();
    }
    
  }

  updatePostulant(){

  }
  getPostulant(){
    this.postulantProfile=this.serv.Postulant.GetLocal();
  }

}
