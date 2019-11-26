import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ServiceService } from 'src/app/services/service.service';
import { PostulantI } from '../../../../models/models.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal-postulants',
  templateUrl: './modal-postulants.component.html',
  styleUrls: ['./modal-postulants.component.css']
})
export class ModalPostulantsComponent implements OnInit {

  postulants:PostulantI[];
  form:FormGroup;
  postulans1={};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private serv:ServiceService) { 
    this.form = new FormGroup({
      postulants: new FormControl()
   });

   this.getPostulants()
  }

  ngOnInit() {
  }

  getPostulants(){
    this.serv.Vacant.GetPostulants(this.data.id).subscribe(data => {
      this.postulants = <PostulantI[]>data.body;
      for (let i = 0; i < this.postulants.length; i++) {
        this.postulans1[this.postulans1[i].id]="no";
      }
      console.log(this.postulants)
    })
  }
  listaPostulantes(id:number){
    if(this.postulans1[id]=="no"){
      this.postulans1[id]="yes";
    }
    if(this.postulans1[id]=="yes"){
      this.postulans1[id]="no";
    }
  }

}
