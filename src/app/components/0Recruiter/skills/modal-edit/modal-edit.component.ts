import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SkillI } from 'src/app/models/models.model';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SkillI) { }

  ngOnInit() {
  }

}
