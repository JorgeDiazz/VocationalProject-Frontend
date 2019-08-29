import { NgModule } from '@angular/core';  
import { AppPostulantComponent } from './app-postulant.component';
import { GeneralModule } from '../moduleGeneral/general.module';
 

@NgModule({
  declarations: [AppPostulantComponent],
  imports: [
    GeneralModule
  ]
})
export class ModulePostulant { }
