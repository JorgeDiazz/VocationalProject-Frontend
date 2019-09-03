import { Injectable } from '@angular/core';
import { GlobalI, ChargeI, VacantI, softSkillI } from '../models/models.model';

@Injectable({
  providedIn: 'root'
})
export class ServGlobalService {

  Global: GlobalI;

  constructor() {
    this.Global = {};
     

  }


  addSoft(soft: softSkillI) {
    this.load();
    if (!this.Global.companies[0].softSkill) {
      this.Global.companies[0].softSkill = [];
    } 
    soft.id_=this.Global.companies[0].softSkill.length;
    this.Global.companies[0].softSkill.push(soft);
    this.save()
  }

  getSofts(){
    this.load();
    return this.Global.companies[0].softSkill;
  }

  getAllGlobal() {
    this.load();
    return this.Global;

  }

  getAllCharges() {
    this.load();
    return this.Global.companies[0].charge;
  }

  getCharge(id: number) {
    this.load();
    if (this.Global.companies[0].charge.length - 1 >= id) {
      return this.Global.companies[0].charge[id];
    }


  }
  addCharge(charge: ChargeI) {
    this.load();
    charge.id_ = this.Global.companies[0].charge.length;
    this.Global.companies[0].charge.push(charge);
    this.save();
  }

  getCompanie() {
    this.load();
    return this.Global.companies[0];
  }

  //id=> el del cargo
  addVacant(id: number, vacant: VacantI) {
    this.load();

    if (this.Global.companies[0].charge[id].vacant) {
      vacant.id_ = this.Global.companies[0].charge[id].vacant.length;
    } else {
      this.Global.companies[0].charge[id].vacant = [];
      vacant.id_ = 0;
    }


    this.Global.companies[0].charge[id].vacant.push(vacant);
    this.save();
  }
  getAllCacant() {
    this.load();

    return this.Global.companies[0].charge;
  }


  load() {
    if (localStorage.getItem('global')) {
      this.Global = JSON.parse(localStorage.getItem('global'));
      console.log("ENTRA?")
    } else {
      this.Global.companies = [];
      this.Global.companies.push(
        {
          nit: "1111",
          name: "BlackBoard",
          charge: []
        }
      );
      console.log(JSON.stringify(this.Global));
      this.save();
    }
  }
  save() {
    localStorage.setItem('global', JSON.stringify(this.Global));
  }
}
