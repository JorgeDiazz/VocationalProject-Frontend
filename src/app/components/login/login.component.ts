import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * Verifico si esta logeado debido a que la ruta fue mal escrita (*) sino:>
 * Utilizo el servicio de Login
 * Guardo el Token
 * Y dejo acceder al lugar correspondiente 
 */


export class LoginComponent implements OnInit {
 
  private log:boolean;
  private reg:string;
  private pos:boolean;
  private bot1:string;
  private bot2:string;

  constructor() {
    this.log= false;
    this.reg="Register colorLog2";
    this.bot1=" buttonLogIn3 pos colorLog1 buttonLogIn3Select";
    this.bot2=" buttonLogIn3 colorLog1";
   }

  ngOnInit() {
   
  }

  change(){
  if (this.log) {
    this.log=false;
    this.reg="Register colorLog2 movLeft";
  } else {
    this.log=true;
    this.reg="Register colorLog2 movRight";
  }
  }
  changePM(){
    if (this.pos) {
      this.pos=false;
      this.bot1=" buttonLogIn3 pos colorLog1 buttonLogIn3Select";
      this.bot2=" buttonLogIn3 colorLog1";
    } else {
      this.pos=true;
      this.bot1=" buttonLogIn3 pos colorLog1";
      this.bot2=" buttonLogIn3 colorLog1  buttonLogIn3Select";
    }
    }

}
