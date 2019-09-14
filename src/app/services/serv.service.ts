import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServService {

  apiURL = "http://localhost:8080/"
  constructor(private httpCliente: HttpClient) {

  }


 
 
  POST(ob, url: string, login?: boolean) {
    if (login) {
      return this.httpCliente.post(this.apiURL + url, ob, { observe: 'response' });
    } else {
      let token = JSON.parse(localStorage.getItem("header")).token;
      //cabecera incluida
      return this.httpCliente.post(this.apiURL + url, ob, { observe: 'response' });
    }

  }

  GET(url) {
    return this.httpCliente.get(this.apiURL + url,{ observe: 'response' });
  }

  PUT(ob,url:string) {
    return this.httpCliente.put(this.apiURL+url,ob, { observe: 'response' });
  }
  DELETE(id:string,url:string) {
    return this.httpCliente.delete(this.apiURL+url+id, { observe: 'response' });
  }

}
