import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MatDialogRef} from '@angular/material'
import { ServiceService } from 'src/app/services/service.service';
import { SkillI } from 'src/app/models/models.model';
import swal, { SweetAlertType } from 'sweetalert2';
import { noWhiteSpace } from 'src/app/components/Validator/validators.validators';
@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent implements OnInit {
   
  form: FormGroup;
  titularAlerta:string="";
  constructor(public dialogRef: MatDialogRef<ModalCreateComponent>,public serv:ServiceService,private fb:FormBuilder) { 

    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required, noWhiteSpace]),
    });

  }

crear(){
  if(this.form.valid){
    let soft:SkillI=this.form.value; 
   soft.type="Soft";
    this.serv.Skill.Post(soft).subscribe(dat => {
      if(dat.status==200){
        swal.fire('Habilidad blanda creada', "se creó correctamente", 'success');
        this.dialogRef.close();
      }
      })
  }
  
}

  ngOnInit() {
  }

}
