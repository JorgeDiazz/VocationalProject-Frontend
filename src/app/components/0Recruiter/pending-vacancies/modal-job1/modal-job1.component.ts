import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { ServiceService } from 'src/app/services/service.service';
import { JobsI, SkillI } from 'src/app/models/models.model';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-job1',
  templateUrl: './modal-job1.component.html',
  styleUrls: ['./modal-job1.component.css']
})
export class ModalJob1Component implements OnInit {
  form: FormGroup;
  nameEmpresa: string = "";
  JobPosition: JobsI;

  softSkill: SkillI[];

  selectSkill:SkillI[]=[];
 //<-- Mat Select Career-->
 protected _onDestroy = new Subject<void>();
 filteredSoftCtrl: ReplaySubject<SkillI[]> = new ReplaySubject<SkillI[]>(1);
 emptySearchSoft = false;
 searchSoft: FormControl = new FormControl('');
 //<-- END Mat Select Career-->


  constructor(public dialogRef: MatDialogRef<ModalJob1Component>,
    @Inject(MAT_DIALOG_DATA) public data: { idJobPosition: number, placesNumber: number,idVacant:number },
    public serv: ServiceService) {

    console.log("El id", data.idJobPosition);
    this.serv.Skill.GetAll(1).subscribe((dat) => {
      this.softSkill = <SkillI[]>dat.body;

      this.filteredSoftCtrl.next(this.softSkill.slice());
      this.searchSoft.valueChanges.
        pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterMultiSoft();
        });

      this.serv.JobPosition.GetJob(data.idJobPosition + "").subscribe(
        (dat) => {
          this.JobPosition = <JobsI>dat.body;
        }
      );
    });

    this.nameEmpresa = this.serv.Recruiter.GetLocal().nameCompany;
    console.log(this.serv.Recruiter.GetLocal());
     
  }

  difundir() {
    if(this.selectSkill.length>0){
      let jobSoftSkill:JobsI={};
      jobSoftSkill.softSkillsId=[];        
      for(let ob of this.selectSkill){
        jobSoftSkill.softSkillsId.push(ob.id);
      }      
      this.serv.JobPosition.PostSoft(this.JobPosition.id,jobSoftSkill).subscribe((dat)=>{
        console.log("Muy bien XD");
        this.dialogRef.close();
        Swal.fire('Proceso compleatado','','success');
      })
    }
    
    
  }
  ngOnInit() {
  }

   /**
    * FIltere soft for MatSelect
    */
  filterMultiSoft() {
    let search = "";
    if (!this.softSkill)
      return;
    search = this.searchSoft.value;
    if (!search) {
      this.filteredSoftCtrl.next(this.softSkill.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredSoftCtrl.next(
      this.softSkill.filter(soft => soft.name.toLowerCase().indexOf(search) > -1)
    );
  }

  /**
   * Cambio en el matselect
   * @param e 
   */
  selectChange(e){
  this.selectSkill=e;
  console.log(this.selectSkill);
  }
   
}
