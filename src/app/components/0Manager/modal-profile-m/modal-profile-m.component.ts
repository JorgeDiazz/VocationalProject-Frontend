import { Component, OnInit } from "@angular/core";
import { CompanyI } from "../../../models/models.model";
import { ServiceService } from "src/app/services/service.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { noWhiteSpace } from 'src/app/components/Validator/validators.validators';
import swal from 'sweetalert2';

@Component({
  selector: "app-modal-profile-m",
  templateUrl: "./modal-profile-m.component.html",
  styleUrls: ["./modal-profile-m.component.css"]
})
export class ModalProfileMComponent implements OnInit {

  companyProfile: CompanyI;
  form: FormGroup;
  update: boolean = false;

  constructor(private serv: ServiceService) {
    this.getCompany();

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      'name': new FormControl(this.companyProfile.name, [Validators.required, noWhiteSpace]),
      'email': new FormControl(this.companyProfile.email, [Validators.required, noWhiteSpace, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      'nit': new FormControl({ value: this.companyProfile.nit, disabled: true }, Validators.required),
      'phone': new FormControl(this.companyProfile.phone, [Validators.required, noWhiteSpace]),
      'address': new FormControl({ value:this.companyProfile.address,disabled:true}, [Validators.required, noWhiteSpace]),
    });
  }
  updateProfile(tip: number) {
    if (tip == 0) {
      this.initForm();
      this.update = true;

    } else {
      this.form.markAllAsTouched();
      console.log(this.form);
      if (this.form.valid) {
        let com: CompanyI = this.form.value;
        com.email = com.email.trim();
        this.updateCompany(com);
      }

    }

  }
 
  /**
   * Actualizar empresa, 
   */
  updateCompany(com: CompanyI) {
    let ob:any={};
    ob.nit=this.companyProfile.nit;
    if(com.address!==this.companyProfile.address){
      ob.address=com.address;
    }
    if(com.name!==this.companyProfile.name){
      ob.name=com.name;
    }
    if(com.phone!==this.companyProfile.phone){
      ob.phone=com.phone;
    }
    if(com.email!==this.companyProfile.email){
      ob.email=com.email.trim();
    }
    this.serv.Company.Put(ob).subscribe(dat => {
      swal.fire('Actualización', 'Los datos fueron actualizados correctamente', 'success');      
      console.log(dat);
      let ob:any;
      ob=dat.body;
      this.serv.Company.PutLocal(ob); 
      this.getCompany();
      this.update = false;
    })

  }

  getCompany() {
    this.companyProfile = this.serv.Company.GetLocal();
  }
}
