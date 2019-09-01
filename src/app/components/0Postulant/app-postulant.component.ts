import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-postulant',
  templateUrl: './app-postulant.component.html',
  styleUrls: ['./app-postulant.component.css']
})
export class AppPostulantComponent implements OnInit {
  

  data=[
    {name:"Vacantes",icon:"fas fa-address-book", route:"vacant"},
    {name:"Vacantes Aplicadas", icon:"fas fa-address-book", route:"apliedVacant"} 
  ]

  constructor() { }

  ngOnInit() {
  }

}
