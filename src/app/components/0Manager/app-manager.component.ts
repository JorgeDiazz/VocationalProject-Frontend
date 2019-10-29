import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-manager',
  templateUrl: './app-manager.component.html',
  styleUrls: ['./app-manager.component.css']
})
export class AppManagerComponent implements OnInit {

  data=[
    {name:"Cargos", icon:"fas fa-tasks", route:"charge"},
    {name:"Habilidades", icon:"fas fa-address-book", route:"skills1"},
    {name:"Reclutadores", icon:"fas fa-address-book icons", route:"recruit"}
  ]
  constructor() { 
    console.log(JSON.stringify(this.data));
  }

  ngOnInit() {
  }

  
}
