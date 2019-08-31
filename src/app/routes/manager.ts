import { Routes} from '@angular/router';
import { HomeComponent } from '../moduleManager/components/home/home.component';
import { EmployeeComponent } from '../moduleManager/components/employee/employee.component';
import { ChargeComponent } from '../moduleManager/components/charge/charge.component';
import { RecruiterComponent } from '../moduleManager/components/recruiter/recruiter.component';

export const routesManager: Routes = [
    {path:'home',component:HomeComponent},
    {path:'employee',component:EmployeeComponent},
    {path:'charge',component:ChargeComponent},
    {path:'recruit',component:RecruiterComponent},
    {path:'**',redirectTo:'home'}
]