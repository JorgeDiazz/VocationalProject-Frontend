import { Component, OnInit } from "@angular/core";
import { CompanyI } from "../../../models/models.model";
import { ServiceService } from "src/app/services/service.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { noWhiteSpaceValidato } from 'src/app/components/Validator/validators.validators';

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

  ngOnInit() {}

  updateProfile(tip: number) {
    if (tip == 0) {
      this.update=true;
      this.form = new FormGroup({
        'name': new FormControl(this.companyProfile.name, [Validators.required, noWhiteSpaceValidato]),
        'email': new FormControl(this.companyProfile.email, Validators.required),
        'nit': new FormControl(this.companyProfile.nit, Validators.required),
        'phone': new FormControl(this.companyProfile.phone, Validators.required),
        'address': new FormControl(this.companyProfile.address, [Validators.required, noWhiteSpaceValidato]),
      })
    } else {
      this.update=false;
      this.updateCompany();
      this.getCompany();
    }
    
  }
  //PARA ACTUALIZAR
  updateCompany(){

  }
  getCompany(){
    this.companyProfile = this.serv.Company.GetLocal();
  }
}
