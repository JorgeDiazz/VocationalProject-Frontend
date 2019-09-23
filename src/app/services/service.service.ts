import { Injectable } from '@angular/core'; 
import { AuthService } from './session/auth.service';  
import { PostulantService } from './data/postulant.service';
import { AreaService } from './data/area.service';
import { CareerService } from './data/career.service';
import { JobPositionService } from './data/job-position.service';
import { ProcessService } from './data/process.service';
import { SkillService } from './data/skill.service';
import { VacantService } from './data/vacant.service';
import { RecruiterService } from './data/recruiter.service';
import { CompanyService } from './data/company.service';
import { LoginService } from './session/login.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(public login: LoginService, 
    public Auth: AuthService, 
    public Company:CompanyService,
    public Postulant:PostulantService,
    public Area:AreaService,
    public Career:CareerService,
    public JobPosition: JobPositionService,
    public Process:ProcessService,
    public Skill:SkillService,
    public Vacant:VacantService,
    public Recruiter:RecruiterService
    
    ) { 
  }
  
 
}
