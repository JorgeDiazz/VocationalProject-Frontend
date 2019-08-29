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

  constructor() { }

  ngOnInit() {
    
  }

}
