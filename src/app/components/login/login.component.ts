import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UserI, AuthI } from 'src/app/models/models.model';
import { ServService } from 'src/app/services/serv.service';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router'; 
import { RecruiterI } from 'src/app/models/models.model';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(public serv:ServiceService,private route:Router,private _snackBar: MatSnackBar) {
    let auth:AuthI=this.serv.auth.getAuth();
    if(auth){
      this.navigate(auth.type);
    }

  }
 

  ngOnInit() {
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
      'id': new FormControl('', Validators.required)
    });
  }
   
  login(){     
    //this.form.get("userEmail").markAsTouched();
    //this.form.get("password").markAsTouched();
    let valid1=this.form.get("userEmail").valid;
    let valid2=this.form.get("password").valid;
    if(valid2 && valid1){
      let user:UserI={user:this.form.value.userEmail,password:this.form.value.password}
     
      this.serv.login.login(user).subscribe( (d)=>{
         
        let type:string=(<any> d.body).type;
        this.navigate(type);
        this.serv.auth.saveAuth(d.headers,<any>d.body);      
      });
    }else{
      this.openSnackBar("Datos incompletos o erróneos", "Undo");
    }
  }

  register(){

    if(this.pos){
      let validEmail=this.form.get("email").valid;
      let validName=this.form.get("name").valid;
      let validNit=this.form.get("nit").valid;
      let validNumber=this.form.get("number").valid;
      if(validEmail && validName && validNit && validNumber){
        //ENVIAR EMPRESA A SERVIDOR
      }else{
        this.openSnackBar("Datos incompletos o erróneos", "Undo");
      }
    }else{
      let validEmail=this.form.get("email").valid;
      let validName=this.form.get("name").valid;
      let validId=this.form.get("id").valid;
      let validPassword=this.form.get("newPassword").valid;
      if(validEmail && validName && validId && validPassword){
        //ENVIAR POSTULANTE A SERVIDOR
      }else{
        this.openSnackBar("Datos incompletos o erróneos", "Undo");
      }
    }
  }


 navigate(type:string){
  switch(type){
    case "RECRUITER":
        this.route.navigateByUrl("/recruiter");
      break;
    case "COMPANY":
        this.route.navigateByUrl("/manager");
      break;
    case "POSTULANT":
        this.route.navigateByUrl("/postulant");
      break;
  }
 }

  change() {
    if (this.log) {
      this.form.get("userEmail").markAsUntouched();
      this.form.get("password").markAsUntouched();
      this.log = false;
      this.reg = "Register bg-colorGR-blue-medium movLeft";
    } else {
      this.form.get("userEmail").markAsUntouched();
      this.form.get("password").markAsUntouched();
      this.log = true;
      this.reg = "Register bg-colorGR-blue-medium movRight";
    }
  }
  changePM() {
    if (this.pos) {
      this.form.get("email").markAsUntouched();
      this.form.get("name").markAsUntouched();
      this.form.get("nit").markAsUntouched();
      this.form.get("number").markAsUntouched();
      this.pos = false;
      this.bot1 = " buttonLogIn3 pos bg-colorGR-blue-light buttonLogIn3Select";
      this.bot2 = " buttonLogIn3 bg-colorGR-blue-light";
    } else {
      this.form.get("email").markAsUntouched();
      this.form.get("name").markAsUntouched();
      this.form.get("id").markAsUntouched();
      this.form.get("newPassword").markAsUntouched();
      this.pos = true;
      this.bot1 = " buttonLogIn3 pos bg-colorGR-blue-light";
      this.bot2 = " buttonLogIn3 bg-colorGR-blue-light  buttonLogIn3Select";
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }


}
