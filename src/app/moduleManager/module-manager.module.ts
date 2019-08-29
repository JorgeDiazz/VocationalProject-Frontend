import { NgModule } from '@angular/core'; 
import {GeneralModule} from '../moduleGeneral/general.module'

import { AppManagerComponent } from './app-manager.component'; 
 

@NgModule({
  declarations: [AppManagerComponent],
  imports: [
     GeneralModule
  ]
})
export class ModuleManager { }
