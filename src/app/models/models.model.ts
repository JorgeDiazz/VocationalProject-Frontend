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
    vacants_number_to_care?:number;
    postulants_number_to_care?:number;
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
    id:number,
    name:string,
    salary_min:number,
    salary_max:number,
    description?:string,
    id_area?:number,
    vacants_number?:number,

}


















 