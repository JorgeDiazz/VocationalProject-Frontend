import { Injectable } from '@angular/core';
import { ServService } from '../serv.service';
import { PostulantI } from 'src/app/models/models.model';
import { AuthService } from '../session/auth.service';
import { CareerI } from '../../models/models.model';

@Injectable({
  providedIn: 'root'
})
export class PostulantService {
  private URL = "postulant/";
  constructor(private serv: ServService,
    private auth: AuthService) { }


  /**
   * Register Postulant
   * @param postulante Object
   */
  Post(postulant: PostulantI) {
    postulant.id = String(postulant.id);
    console.log(postulant);
    return this.serv.POST(postulant, this.URL);
  }


  /**
   * Update postulant
   */
  Put(postulant: PostulantI) {
    return this.serv.PUT(postulant, this.URL);
  }

  /**
   * Update postulant to local
   */
  PutLocal(postualnt: PostulantI) {
    let dat: any = this.auth.getAuth();
    dat.name = postualnt.name;
    dat.email = postualnt.email;
    localStorage.setItem("auth", JSON.stringify(dat));
  }
  /**
   * Get postulant in the local Storage
   * @return object
   */
  GetLocal(): PostulantI {
    let dat: any = this.auth.getAuth();
    let id: string = dat.id;
    let name: string = dat.name;
    let email: string = dat.email;
    let careers:CareerI[] = dat.careers;
    let postulant: PostulantI = {
      id: id,
      name: name,
      email: email,
      careers:careers
    }
    return postulant;
  }
}
