import { Injectable } from '@angular/core';
import { ServService } from '../serv.service';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private URL="career/";
  constructor(private serv:ServService) { }

  /**
   * Get careers.
   * Return observable with data.
   */
  GetAll(){
    return this.serv.GET( `${this.URL}` );
  }
}
