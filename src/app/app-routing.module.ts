import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppManagerComponent } from './moduleManager/app-manager.component';
import { LoginComponent } from './components/login/login.component';
import { AuthManagerGuard } from './guard/auth-manager.guard';
import { AppPostulantComponent } from './modulePostulant/app-postulant.component';
import { AuthPostulantGuard } from './guard/auth-postulant.guard';
import { AppRecruiterComponent } from './moduleRecruiter/app-recruiter.component';
import { AuthRecruiterGuard } from './guard/auth-recruiter.guard';

import { HomeComponent } from './moduleManager/components/home/home.component';
import { EmployeeComponent } from './moduleManager/components/employee/employee.component';
import { ChargeComponent } from './moduleManager/components/charge/charge.component';
import { RecruiterComponent } from './moduleManager/components/recruiter/recruiter.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'manager', component: AppManagerComponent, canActivate: [AuthManagerGuard],
    children: [
      {path:'home',component:HomeComponent},
      {path:'employee',component:EmployeeComponent},
      {path:'charge',component:ChargeComponent},
      {path:'recruit',component:RecruiterComponent},
      {path:'**',redirectTo:'home'}

    ]
  },
  {
    path: 'postulant', component: AppPostulantComponent, canActivate: [AuthPostulantGuard],
    children: [


    ]
  },
  {
    path: 'recruiter', component: AppRecruiterComponent, canActivate: [AuthRecruiterGuard],
    children: [


    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
