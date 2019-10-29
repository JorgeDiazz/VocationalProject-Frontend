import { Injectable } from '@angular/core';
import { ServService } from 'src/app/services/serv.service';
import { VacantI, CareerI } from '../../models/models.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VacantService {

  private URL="vacant/";

  constructor(private serv:ServService) { }

  Post(vacant:VacantI,job:number){      
    vacant.idJobPosition=job; 
    console.log("Lo que envio realmente",vacant);
    return this.serv.POST(vacant,this.URL);
  }

  GetByCarrers(dat:CareerI[]){
    let str:string="";
     for(let i=0; i<dat.length; i++){
      if(i==dat.length-1){
        str+=""+dat[i].id;
      }else{
        str+=dat[i].id+",";
      } 
     }
     console.log(str);
    //let params=new HttpParams().set('careers',str.toString());    
     return this.serv.GET(`${this.URL}forPostulant/?careers=${str}`);
  }
}
