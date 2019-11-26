import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-postulant',
  templateUrl: './modal-postulant.component.html',
  styleUrls: ['./modal-postulant.component.css']
})
export class ModalPostulantComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
