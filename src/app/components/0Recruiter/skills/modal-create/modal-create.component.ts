import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MatDialogRef} from '@angular/material'
import { ServiceService } from 'src/app/services/service.service';
import { SkillI } from 'src/app/models/models.model';
import swal, { SweetAlertType } from 'sweetalert2';
@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent implements OnInit {
  softs:SkillI[];  
  form: FormGroup;
  titularAlerta:string="";
  constructor(public dialogRef: MatDialogRef<ModalCreateComponent>,public serv:ServiceService,private fb:FormBuilder) { 

    this.serv.company.getSkillsSoft().subscribe(dat=>{
      this.softs=<SkillI[]>dat.body;
    });

    this.form = new FormGroup({
      'newSkill': new FormControl(),
      'Skill': new FormControl(),
      'GorE':  new FormControl()
    });


  }

crear(){
  this.form.markAsTouched();
  if(this.form.valid){
    console.log(this.form.get('newSkill').value);
    if(this.form.get('GorE').value!=null){
      if(this.form.get('newSkill').value!=null && this.form.get('Skill').value==null){
        this.dialogRef.close(this.form.value);
      }else
      if(this.form.get('newSkill').value==null && this.form.get('Skill').value!=null){
        this.dialogRef.close(this.form.value);
      }else if(this.form.get('newSkill').value!=null && this.form.get('Skill').value!=null){
        swal.fire('Datos incompletos',"Puede ingresar solo una habilidad", 'error');
      }else{
        swal.fire('Datos erroneos',"Puede ingresar  una habilidad", 'error');
      }
    }else{
      swal.fire('Datos incompletos',"Tiene que ingresar el tipo de habilidad (Global o Específica)", 'error');


    }
    
    
  }
  
}

  ngOnInit() {
  }

}
