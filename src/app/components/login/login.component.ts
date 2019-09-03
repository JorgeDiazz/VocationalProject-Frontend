import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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

  private log: boolean;
  private reg: string;
  private pos: boolean;
  private bot1: string;
  private bot2: string;
  form: FormGroup;
  constructor() {
    this.log = false;
    this.reg = "Register bg-colorGR-blue-medium";
    this.bot1 = " buttonLogIn3 pos bg-colorGR-blue-light buttonLogIn3Select";
    this.bot2 = " buttonLogIn3 bg-colorGR-blue-light";

    this.form = new FormGroup({
      'userEmail': new FormControl('', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      'password': new FormControl('', Validators.required),
      'newPassword': new FormControl('', Validators.required),
      'nit': new FormControl('', Validators.required),
      'number': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      'name': new FormControl('', Validators.required),
      'career': new FormControl('', Validators.required)
    });

  }

  ngOnInit() {

  }
   

  change() {
    if (this.log) {
      this.log = false;
      this.reg = "Register bg-colorGR-blue-medium movLeft";
    } else {
      this.log = true;
      this.reg = "Register bg-colorGR-blue-medium movRight";
    }
  }
  changePM() {
    if (this.pos) {
      this.pos = false;
      this.bot1 = " buttonLogIn3 pos bg-colorGR-blue-light buttonLogIn3Select";
      this.bot2 = " buttonLogIn3 bg-colorGR-blue-light";
    } else {
      this.pos = true;
      this.bot1 = " buttonLogIn3 pos bg-colorGR-blue-light";
      this.bot2 = " buttonLogIn3 bg-colorGR-blue-light  buttonLogIn3Select";
    }
  }

}
