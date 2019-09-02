export interface ChargeI{
    id_?:number;
    name:string;
    carrer:careerI[];
    range:string;
    desc:string;
    strongSkill:strongSkillI[];   
  
}
export interface careerI{
    name:string;
     
}

export interface strongSkillI{
    name:string;
     
}