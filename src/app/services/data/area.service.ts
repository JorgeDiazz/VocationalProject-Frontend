import { Injectable } from '@angular/core';
import { ServService } from '../serv.service';
import { AreaI } from 'src/app/models/models.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private URL="area/"
  constructor(private serv:ServService) { }

  /**
   * Receive a object of Area to Post
   * @param area AreaI
   */
  Post(area:AreaI){      
    return this.serv.POST(area,`${this.URL}${area.nit_company}`);
  }
  /**
   * Get Areas
   * Return Observable with data of Areas of the company,
   * 
   */
  GetAll(){     
    return this.serv.GET(`${this.URL}${this.serv.getCompany().nit}`);
  }
}
