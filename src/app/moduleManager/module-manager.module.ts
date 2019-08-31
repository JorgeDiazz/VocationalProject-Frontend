import { NgModule } from '@angular/core'; 
import {GeneralModule} from '../moduleGeneral/general.module'

import { AppManagerComponent } from './app-manager.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { RecruiterComponent } from './components/recruiter/recruiter.component';
import { ChargeComponent } from './components/charge/charge.component'; 
 

@NgModule({
  declarations: [AppManagerComponent, EmployeeComponent, HomeComponent, RecruiterComponent, ChargeComponent],
  imports: [
     GeneralModule
  ]
})
export class ModuleManager { }
