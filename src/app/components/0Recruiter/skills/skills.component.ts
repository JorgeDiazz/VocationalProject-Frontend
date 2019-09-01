import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { ModalCreateComponent } from './modal-create/modal-create.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  verModalE() {
      const dialogRef = this.dialog.open(ModalEditComponent, {
        width: '350px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  verModalC() {
    const dialogRef = this.dialog.open(ModalCreateComponent, {
      width: '350px'
    });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
}
