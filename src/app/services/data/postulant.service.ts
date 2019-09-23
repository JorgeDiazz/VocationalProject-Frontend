import { Injectable } from '@angular/core';
import { ServService } from '../serv.service';
import { PostulantI } from 'src/app/models/models.model';
import { AuthService } from '../session/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostulantService {

  constructor(private serv:ServService,
              private auth: AuthService) { }
 

   /**
    * Register Postulant
    * @param postulante Object
    */
  Post(postulant:PostulantI){
    return this.serv.POST(postulant,"postulant/");
  }

  /**
   * Get postulant in the local Storage
   * @return object
   */
  GetLocal():PostulantI{
    let dat: any = this.auth.getAuth();
    let id:string=dat.id;
    let name:string=dat.name;
    let email:string=dat.email;
    let postulant:PostulantI={
      id: id,
      name: name,
      email:email
    }
    return postulant;
  }
}
