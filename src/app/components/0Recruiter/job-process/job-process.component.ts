import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalPostulantComponent } from '../../0Manager/job-id/modal-postulant/modal-postulant.component';

@Component({
  selector: 'app-job-process',
  templateUrl: './job-process.component.html',
  styleUrls: ['./job-process.component.css']
})
export class JobProcessComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  verModal() {
      const dialogRef = this.dialog.open(ModalPostulantComponent, {
        width: '350px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
