import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-manager',
  templateUrl: './app-manager.component.html',
  styleUrls: ['./app-manager.component.css']
})
export class AppManagerComponent implements OnInit {

  toggled=true;
  constructor() { }

  ngOnInit() {
  }

  changeToggle(){
    this.toggled=!this.toggled;
  }

}
