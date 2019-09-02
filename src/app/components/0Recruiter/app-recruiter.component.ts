import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-recruiter',
  templateUrl: './app-recruiter.component.html',
  styleUrls: ['./app-recruiter.component.css']
})
export class AppRecruiterComponent implements OnInit {
  data=[
    {name:"Vacantes Pendientes",icon:"fas fa-address-book", route:"vacant"},
    {name:"Habilidades", icon:"fas fa-address-book", route:"skills"},
    {name:"En proceso", icon:"fas fa-address-book",route:"inProcess"} 
  ]

  constructor() { }

  ngOnInit() {
  }

   

}
