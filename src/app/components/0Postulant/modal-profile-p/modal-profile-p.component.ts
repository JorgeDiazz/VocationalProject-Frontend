import { Component, OnInit } from '@angular/core';
import { PostulantI } from '../../../models/models.model';
import { ServiceService } from '../../../services/service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { noWhiteSpace } from 'src/app/components/Validator/validators.validators';
import swal from 'sweetalert2';
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
    this.initForm();
  }

  initForm(){
    this.form = new FormGroup({
      'id':new FormControl({ value: this.postulantProfile.id, disabled: true }, Validators.required),
      'name': new FormControl(this.postulantProfile.name,[Validators.required, noWhiteSpace]),
      'email': new FormControl(this.postulantProfile.email, [Validators.required,noWhiteSpace, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    });
  }

  updateProfile(tip: number) {
    if (tip == 0) {
      this.update=true;
      this.initForm();
    } else {
      let rec:PostulantI=this.form.value;
      this.form.markAllAsTouched();
      if(this.form.valid){
        this.updatePostulant(rec);   
      }
      
    }
    
  }

  updatePostulant(rec:PostulantI){

    let ob:any={};    
    ob.id=this.postulantProfile.id;
    
    if(rec.name!==this.postulantProfile.name){
      ob.name=rec.name;
    } 
    if(rec.email!==this.postulantProfile.email){
      ob.email=rec.email.trim();
    }
    this.serv.Recruiter.Put(ob).subscribe(dat=>{
      swal.fire('Actualización', 'Los datos fueron actualizados correctamente', 'success');      
      console.log(dat);
      let ob:any;
      ob=dat.body;
      this.serv.Postulant.PutLocal(ob); 
      this.getPostulant();
      this.update = false;
    })
  }
  getPostulant(){
    this.postulantProfile=this.serv.Postulant.GetLocal();
  }

}
