import { Injectable } from '@angular/core';
import { CompanyI } from 'src/app/models/models.model';
import { AuthService } from '../session/auth.service';
import { ServService } from '../serv.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private URL = "company/";
  constructor(private auth: AuthService,
    private serv: ServService) { }

  /**
   * Get Company in the local Storage
   * @return object
   */
  GetLocal(): CompanyI {

    let dat: any = this.auth.getAuth();
    console.log(dat);
    let nit: string = dat.nit;
    let name: string = dat.name;
    let email: string = dat.email;
    let phone: number = parseInt(dat.phone);
    let address: string = dat.address;
    let company: CompanyI = {
      nit: nit,
      name: name,
      address: address,
      phone: phone,
      email: email
    }

    return company;
  }

  /**
   * Register Company
   * @param company
   */
  Post(company: CompanyI) {
    return this.serv.POST(company, this.URL);
  }
}
