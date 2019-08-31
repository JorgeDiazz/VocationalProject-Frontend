import { NgModule } from '@angular/core';  
import { AppPostulantComponent } from './app-postulant.component';
import { GeneralModule } from '../moduleGeneral/general.module';
import { Modal1Component } from './components/modal1/modal1.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  entryComponents:[Modal1Component],
  declarations: [AppPostulantComponent, Modal1Component, HomeComponent],
  imports: [
    GeneralModule
  ]
})
export class ModulePostulant { }
