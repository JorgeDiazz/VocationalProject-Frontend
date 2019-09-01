import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-manager',
  templateUrl: './app-manager.component.html',
  styleUrls: ['./app-manager.component.css']
})
export class AppManagerComponent implements OnInit {

  data=[
    {name:"Home",icon:"fas fa-home", route:"home"},
    {name:"Cargos", icon:"fas fa-tasks", route:"charge"},
    {name:"Reclutadores", icon:"fas fa-address-book icons", route:"recruit"},
    {name:"Empleado", icon:"far fa-building", route:"employee"}
  ]
  constructor() { 
    console.log(JSON.stringify(this.data));
  }

  ngOnInit() {
  }

  
}
