import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../moduleGeneral/material.module'

import {HttpClientModule} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { ChartsModule } from 'ng2-charts';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search'; //Search Selection
 

@NgModule({    
  exports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule, 
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,//Validación de formularios por Data
    ChartsModule , 
    NgxMatSelectSearchModule
  ]
})
export class GeneralModule { }
