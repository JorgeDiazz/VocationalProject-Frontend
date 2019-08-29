import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppManagerComponent } from './app-manager.component';

//Material angular
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../zmoduleMaterial/material.module'

import {HttpClientModule} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [AppManagerComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,//Validación de formularios por Data
    ChartsModule 
  ]
})
export class ModuleManager { }
