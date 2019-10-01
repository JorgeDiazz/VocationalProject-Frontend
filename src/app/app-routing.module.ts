import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppManagerComponent } from './components/0Manager/app-manager.component';
import { LoginComponent } from './components/login/login.component';
import { AuthManagerGuard } from './guard/auth-manager.guard';
import { AppPostulantComponent } from './components/0Postulant/app-postulant.component';
import { AuthPostulantGuard } from './guard/auth-postulant.guard';
import { AppRecruiterComponent } from './components/0Recruiter/app-recruiter.component';
import { AuthRecruiterGuard } from './guard/auth-recruiter.guard';

import { HomeComponent } from './components/0Manager/home/home.component';
import { EmployeeComponent } from './components/0Manager/employee/employee.component';
import { ChargeComponent } from './components/0Manager/charge/charge.component';
import { RecruiterComponent } from './components/0Manager/recruiter/recruiter.component';
import { VacantComponent } from './components/0Postulant/vacant/vacant.component'; 
import { AppliedVacantComponent } from './components/0Postulant/applied-vacant/applied-vacant.component';
import { PendingVacanciesComponent } from './components/0Recruiter/pending-vacancies/pending-vacancies.component';
import { SkillsComponent } from './components/0Recruiter/skills/skills.component';
import { InProcessComponent } from './components/0Recruiter/in-process/in-process.component';
import { JobIdComponent } from './components/0Manager/job-id/job-id.component';
import { JobProcessComponent } from './components/0Recruiter/job-process/job-process.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'manager', component: AppManagerComponent, canActivate: [AuthManagerGuard],
    children: [
      {path:'job/:id',component:JobIdComponent},
      {path:'charge',component:ChargeComponent},
      {path:'recruit',component:RecruiterComponent},
      {path:'**',redirectTo:'charge'}

    ]
  },
  {
    path: 'postulant', component: AppPostulantComponent, canActivate: [AuthPostulantGuard],
    children: [
      {path:'vacant',component:VacantComponent},
      {path:'apliedVacant',component:AppliedVacantComponent},
      {path:'**',redirectTo:'vacant'}

    ]
  },
  {
    path: 'recruiter', component: AppRecruiterComponent, canActivate: [AuthRecruiterGuard],
    children: [
      {path:'vacant',component:PendingVacanciesComponent},
      {path:'skills',component:SkillsComponent},
      {path:'job/:id',component:JobProcessComponent},
      {path:'inProcess',component:InProcessComponent},
      {path:'**',redirectTo:'vacant'}

    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
