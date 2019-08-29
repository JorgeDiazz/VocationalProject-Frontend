import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

//Modulos
import {ModuleManager} from './moduleManager/module-manager.module'
import {ModulePostulant} from './modulePostulant/module-postulant.module';
import {ModuleRecruiter} from './moduleRecruiter/module-recruiter.module' 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, 
    ModuleManager,
    ModulePostulant,
    ModuleRecruiter,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
