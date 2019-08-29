import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPostulantComponent } from './app-postulant.component';

//Material Angular
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../zmoduleMaterial/material.module'

import {HttpClientModule} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [AppPostulantComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, //Validación de formularios por Data
    ChartsModule 
  ]
})
export class ModulePostulant { }
