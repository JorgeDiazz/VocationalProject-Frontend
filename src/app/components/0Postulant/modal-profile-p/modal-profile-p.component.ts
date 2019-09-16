import { Component, OnInit } from '@angular/core';
import { PostulantI } from '../../../models/models.model';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-modal-profile-p',
  templateUrl: './modal-profile-p.component.html',
  styleUrls: ['./modal-profile-p.component.css']
})
export class ModalProfilePComponent implements OnInit {

  postulantProfile:PostulantI;
  constructor(private serv:ServiceService) {
    this.postulantProfile=this.serv.getPostulant();
   }

  ngOnInit() {
  }

}
