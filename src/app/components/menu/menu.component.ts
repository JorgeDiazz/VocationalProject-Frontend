import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalProfileMComponent } from '../0Manager/modal-profile-m/modal-profile-m.component';
import { ModalProfileRComponent } from '../0Recruiter/modal-profile-r/modal-profile-r.component';
import { ModalProfilePComponent } from '../0Postulant/modal-profile-p/modal-profile-p.component';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  toggled=true;

  @Input() data:[];
  @Input() type:string="";
  @Input() colorSide:string="";
  @Input() colorFoot:string="";
  
  constructor(public dialog: MatDialog,private serv:ServiceService) {
    console.log(JSON.stringify(this.data));
   }

  ngOnInit() {
  }

  logOut(){
    this.serv.login.logOut();
  }

  changeToggle(){
    this.toggled=!this.toggled;
  }

  mostrarP(){
    if(this.type=="manager"){
      const dialogRef = this.dialog.open(ModalProfileMComponent, {
        width: '650px'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    }
    if(this.type=="recruiter"){
      const dialogRef = this.dialog.open(ModalProfileRComponent, {
        width: '480px'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    }

    if(this.type=="postulant"){
      const dialogRef = this.dialog.open(ModalProfilePComponent, {
        width: '480px'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    }

  }

}
