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
    vacantsNumber?:number;
    postulantsNumber?:number;
}
/** Carreras */
export interface CareerI{
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
    name:string,
    phone?:number,
    email?:string,
    address?:string
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

export interface PostulantI{
    id:string,
    name:string,
    email:string,
    password?:string
}

export interface JobsI{
    id?:number,
    name:string,
    nitCompany?:string,    
    salaryMin:number,
    salaryMax:number,
    description?:string,
    idArea?:number,
    career?:CareerI[]
    careersId?:number[];
    newCareer?:CareerI[],
    newCareersName?:string[],
    hardSkill?:SkillI[],
    hardSkillsId?:number[],
    newHardSkill?:SkillI[],
    newHardSkillsName?:string[]
    process?:ProcessI[],
    processesName?:string[],
    recruiter?:RecruiterI[],
    recruitersId?:string[],
    placeNumber?:number, 
    placesNumber?:number

}

export interface ProcessI{
    id?:string,
    name:string,
}

export interface VacantI{
    id:number,
    places_number:number,
    start_date:Date,
    id_job_position?:number,
    nameJob?:string,
    recruiters_number:string,
    postulants_number:number,
    min_salary?:number,
    max_salary?:number
}



















 