import { NgModule } from '@angular/core'; 
import { AppRecruiterComponent } from './app-recruiter.component';  
import {GeneralModule} from '../moduleGeneral/general.module'
 

@NgModule({
  declarations: [AppRecruiterComponent],
  imports: [
    GeneralModule
  ]
})
export class ModuleRecruiter { }
