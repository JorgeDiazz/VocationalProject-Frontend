import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  toggled=true;

  @Input() data:[];

  constructor() {
    console.log(JSON.stringify(this.data));
   }

  ngOnInit() {
  }

  changeToggle(){
    this.toggled=!this.toggled;
  }


}
