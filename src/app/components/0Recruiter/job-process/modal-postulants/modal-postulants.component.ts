import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ServiceService } from 'src/app/services/service.service';
import { PostulantI } from '../../../../models/models.model';

@Component({
  selector: 'app-modal-postulants',
  templateUrl: './modal-postulants.component.html',
  styleUrls: ['./modal-postulants.component.css']
})
export class ModalPostulantsComponent implements OnInit {

  postulants:PostulantI[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private serv:ServiceService) { 
   this.serv.Vacant.GetPostulants(data.id).subscribe(data => {
    this.postulants = <PostulantI[]>data.body;
    console.log(this.postulants)
  })
  }

  ngOnInit() {
  }

}
