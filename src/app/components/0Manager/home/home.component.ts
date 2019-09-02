import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data=[ 
    {name:"Cargos", icon:"fas fa-tasks", route:"/manager/charge"},
    {name:"Reclutadores", icon:"fas fa-address-book icons", route:"/manager/recruit"},
    //{name:"Empleado", icon:"far fa-building", route:"/manager/employee"}
  ]

  constructor() { }

  ngOnInit() {
  }

}