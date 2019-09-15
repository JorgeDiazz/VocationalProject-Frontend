/**     Para logearse             */
export interface UserI{
    user:string;
    password:string;
}

/** Para crear Reclutador */
export interface RecruiterI{
   
    id:string;
    name?:string,
    email:string,
    image?:string,
    type?:string, 
    nitCompany:string;
}
/** Carreras */
export interface CarrerI{
    id:number,
    name:string;
}
 /** Autenticacion */
export interface AuthI{
    token:string,
    type:string,
    user?:any
}

export interface CompanyI{
    nit:string,
    name:string
}

/**  */
export interface AreaI{
id?:string;
name:string;
nit_company?:string;
}

/** Skills HARD and SOFT */
export interface SkillI{
id:number,
name:string,
type?:string
}
export interface JobPositionI{
    
}


















/** Es de la MVP */
export interface ChargeI{
    id_?:number;
    name:string;
    carrer:careerI[];
    range:string;
    desc:string;
    strongSkill:strongSkillI[];
    
    vacant?:VacantI[];   
  
}



interface careerI{
    name:string;
     
}

 interface strongSkillI{
    name:string;     
}

export interface VacantI{
    id_?:number;
    startDate:string;
    placeNumber:number;
    extender:boolean;
    postulant?:{cc:string, }[];
}
 

export interface PostulantI{
    cc:string;
    name:string;
    jobApplied:jobAplliedI[];
}

 interface jobAplliedI{
    nit:string;
    vacantId:string;
}

export interface softSkillI{
    id_?:number;
    name:string;
    type:number;

}

export interface companyI{
    nit:string;
    name:string;
    softSkill?:softSkillI[];
    charge?:ChargeI[];


}

export interface GlobalI{
    postulants?: PostulantI[];
    companies?: companyI[];
    softSkills?: softSkillI[];
}