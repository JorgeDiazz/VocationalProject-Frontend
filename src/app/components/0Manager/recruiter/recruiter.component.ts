import { Component, OnInit } from '@angular/core';
import { ModalRecComponent } from './modal-rec/modal-rec.component';
import { MatDialog } from '@angular/material/dialog'; 

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {

  constructor(public dialog: MatDialog ) { }

  ngOnInit() {
  }
  verModal() {
    const dialogRef = this.dialog.open(ModalRecComponent, {
      width: '350px'
    });

  dialogRef.afterClosed().subscribe(result => {
    
    console.log(`Dialog result: ${JSON.stringify(result)}`);
  });
}
}
