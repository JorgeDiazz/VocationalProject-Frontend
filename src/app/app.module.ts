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
import { ModalVacantComponent } from './components/0Postulant/vacant/modal-vacant/modal-vacant.component';
import { ModalJobComponent } from './components/0Manager/charge/modal-job/modal-job.component';
import { ModalRecComponent } from './components/0Manager/recruiter/modal-rec/modal-rec.component';
import { ModalJob1Component } from './components/0Recruiter/pending-vacancies/modal-job1/modal-job1.component';
import { ModalEditComponent } from './components/0Recruiter/skills/modal-edit/modal-edit.component';
import { ModalCreateComponent } from './components/0Recruiter/skills/modal-create/modal-create.component';
import { JobIdComponent } from './components/0Manager/job-id/job-id.component';
import { ModalVacant1Component } from './components/0Manager/job-id/modal-vacant1/modal-vacant1.component';
import { ModalPostulantComponent } from './components/0Manager/job-id/modal-postulant/modal-postulant.component';
import { JobProcessComponent } from './components/0Recruiter/job-process/job-process.component';
import { ModalProfileMComponent } from './components/0Manager/modal-profile-m/modal-profile-m.component';
import { ModalProfileRComponent } from './components/0Recruiter/modal-profile-r/modal-profile-r.component';
import { ModalProfilePComponent } from './components/0Postulant/modal-profile-p/modal-profile-p.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './errors/http-error.interceptor';
import { ModalPostulantsComponent } from './components/0Recruiter/job-process/modal-postulants/modal-postulants.component';
 
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
    InProcessComponent,
    ModalVacantComponent,
    ModalJobComponent,
    ModalRecComponent,
    ModalJob1Component,
    ModalEditComponent,
    ModalCreateComponent,
    JobIdComponent,
    ModalVacant1Component,
    ModalPostulantComponent,
    JobProcessComponent,
    ModalProfileMComponent,
    ModalProfileRComponent,
    ModalProfilePComponent,
    ModalPostulantsComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    GeneralModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [ModalVacantComponent,ModalJob1Component,ModalJobComponent,ModalEditComponent,ModalCreateComponent,ModalRecComponent,ModalVacant1Component,ModalPostulantComponent,ModalPostulantsComponent,
  ModalProfileMComponent,ModalProfileRComponent,ModalProfilePComponent],
})
export class AppModule { }
