import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { RecruiterI } from 'src/app/models/models.model';

@Component({
  selector: 'app-modal-profile-r',
  templateUrl: './modal-profile-r.component.html',
  styleUrls: ['./modal-profile-r.component.css']
})
export class ModalProfileRComponent implements OnInit {

  recruiterProfile:RecruiterI;
  constructor(private serv:ServiceService) { 
    this.recruiterProfile=this.serv.Recruiter.GetLocal();
  }

  ngOnInit() {
  }

}
