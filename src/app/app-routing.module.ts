import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppManagerComponent } from './moduleManager/app-manager.component';
import { LoginComponent } from './components/login/login.component';
import { AuthManagerGuard } from './guard/auth-manager.guard';
import { AppPostulantComponent } from './modulePostulant/app-postulant.component';
import { AuthPostulantGuard } from './guard/auth-postulant.guard';
import { AppRecruiterComponent } from './moduleRecruiter/app-recruiter.component';
import { AuthRecruiterGuard } from './guard/auth-recruiter.guard';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'manager',component:AppManagerComponent, canActivate:[AuthManagerGuard],
  children:[


  ]},
  {path:'postulant', component:AppPostulantComponent, canActivate:[AuthPostulantGuard],
  children:[


  ]},
  {path:'recruiter',component:AppRecruiterComponent, canActivate:[AuthRecruiterGuard],
  children:[

    
  ]},
  {path:'**',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
