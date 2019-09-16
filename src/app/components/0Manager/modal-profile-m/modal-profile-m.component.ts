import { Component, OnInit } from '@angular/core';
import { CompanyI } from '../../../models/models.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-modal-profile-m',
  templateUrl: './modal-profile-m.component.html',
  styleUrls: ['./modal-profile-m.component.css']
})
export class ModalProfileMComponent implements OnInit {

  companyProfile:CompanyI;
  constructor(private serv:ServiceService) { 
    this.companyProfile=this.serv.getCompany();
    console.log(this.companyProfile);
  }

  ngOnInit() {
  }

}
