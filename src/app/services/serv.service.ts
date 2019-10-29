import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthService } from './session/auth.service';
import { CompanyI } from '../models/models.model';

@Injectable({
  providedIn: 'root'
})
export class ServService {

  private apiURL = "http://localhost:8080/"
  
  constructor(private httpCliente: HttpClient,public servAuth:AuthService) {
  }
 /**
  * Post
  * @param ob Object to post
  * @param url Url
  * @param login true in case if the usser login 
  */
  POST(ob, url: string, login?: boolean) {
    
    if (login) {
      return this.httpCliente.post(this.apiURL + url, ob, { observe: 'response' });
    } else { 
      return this.httpCliente.post(this.apiURL + url, ob, {observe: 'response' });
    }

  }
/**
 * Petición Get
 * @param url Url
 * @param params Parametros 
 */
  GET(url:string,params?:HttpParams) {  
    if(!params){
      return this.httpCliente.get(this.apiURL + url,{  observe: 'response' });
    }else{
      return this.httpCliente.get(this.apiURL + url,{ params:params, observe: 'response' });
    }
   
  }
/**
 * Put=Update
 * @param ob Object to update
 * @param url  URL
 */
  PUT(ob,url:string) {
    return this.httpCliente.put(this.apiURL+url,ob, {observe: 'response' });
  }

  /**
   * Delete
   * @param id Id,
   * @param url URL
   */
  DELETE(id:string,url:string) {    
    return this.httpCliente.delete(this.apiURL+url+id, { observe: 'response' });
  }
  
  getCompany():CompanyI {
    let dat: any = this.servAuth.getAuth();
    let nit: string = "Sin NIT";
    let name: string = "Sin NOMBRE se DEBE al reclutador";
    if (dat.nit) {
      nit = dat.nit;
      name = dat.name;
    }
    if (dat.nitCompany) {
      nit = dat.nitCompany;
    }
    let company: CompanyI = {
      nit: nit,
      name: name
    }
    return company;
  }

 
}
