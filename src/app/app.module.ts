import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

//Modulos 
import { AppPostulantComponent } from './components/0Postulant/app-postulant.component';
import { GeneralModule } from './moduleGeneral/general.module';
import { ChargeComponent } from './components/0Manager/charge/charge.component';
import { EmployeeComponent } from './components/0Manager/employee/employee.component';
import { HomeComponent as homeManager } from './components/0Manager/home/home.component';
import { RecruiterComponent } from './components/0Manager/recruiter/recruiter.component';
import { AppRecruiterComponent } from './components/0Recruiter/app-recruiter.component';
import { AppManagerComponent } from './components/0Manager/app-manager.component'; 
import { MenuComponent } from './components/menu/menu.component';
import { VacantComponent } from './components/0Postulant/vacant/vacant.component';
import { AppliedVacantComponent } from './components/0Postulant/applied-vacant/applied-vacant.component';
import { PendingVacanciesComponent } from './components/0Recruiter/pending-vacancies/pending-vacancies.component';
import { SkillsComponent } from './components/0Recruiter/skills/skills.component';
import { InProcessComponent } from './components/0Recruiter/in-process/in-process.component';
 
@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    ChargeComponent,
    EmployeeComponent,
    homeManager,
    RecruiterComponent,
    AppManagerComponent,
    AppRecruiterComponent,
    MenuComponent,
    AppPostulantComponent,
    VacantComponent,
    AppliedVacantComponent,
    PendingVacanciesComponent,
    SkillsComponent,
    InProcessComponent 
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    GeneralModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
