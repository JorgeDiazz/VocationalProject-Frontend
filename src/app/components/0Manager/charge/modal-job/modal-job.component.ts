import { Component, OnInit, Inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ServiceService } from 'src/app/services/service.service';
import { AreaI, CareerI, SkillI, RecruiterI, JobsI } from 'src/app/models/models.model';
import { MatSelect } from '@angular/material';
import { CompanyI } from '../../../../models/models.model';

import swal from 'sweetalert2';
import { takeUntil, take } from 'rxjs/operators';
import { Subject, ReplaySubject } from 'rxjs';
import { CareerService } from 'src/app/services/data/career.service';
import { noWhiteSpace } from 'src/app/components/Validator/validators.validators';
import { isString, isArray } from 'util';


//import { ConsoleReporter } from 'jasmine';


export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-modal-job',
  templateUrl: './modal-job.component.html',
  styleUrls: ['./modal-job.component.css']
})
export class ModalJobComponent implements OnInit,
  AfterViewInit, OnDestroy {


  form: FormGroup;
  nameEmpresa: CompanyI;
  areas: AreaI[];
  careers: CareerI[];
  skillsHard: SkillI[];
  skillsHardSelected: SkillI[];
  careersSelected: CareerI[];
  recruiters: RecruiterI[];
  recruitersSelected: RecruiterI[];

  /**
   * The next if for search Select
   */

  @ViewChild('multiSelectCareer', { static: false }) multiSelectCareer: MatSelect;
  @ViewChild('multiSelectSkillHard', { static: false }) multiSelectSkillHard: MatSelect;
  @ViewChild('multiSelectRecruiter', { static: false }) multiSelectRecruiter: MatSelect;

  protected _onDestroy = new Subject<void>();
  filteredCareerCtrl: ReplaySubject<CareerI[]> = new ReplaySubject<CareerI[]>(1);
  filteredSkillHardCtrl: ReplaySubject<SkillI[]> = new ReplaySubject<SkillI[]>(1);
  filteredRecruiterCtrl: ReplaySubject<RecruiterI[]> = new ReplaySubject<RecruiterI[]>(1);

  emptySearchCareer = false;
  emptySearchSkillHard = false;
  emptySearchRecruiter = false;
  searchCareer: FormControl = new FormControl('');
  searchSkillHard: FormControl = new FormControl('');
  searchRecruiter: FormControl = new FormControl('');


  //Solucion problema
  newcareers: CareerI[];
  newHardSkills: SkillI[];

  constructor(public dialogRef: MatDialogRef<ModalJobComponent>,
    public serv: ServiceService) {
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required, noWhiteSpace]),
      'salaryMin': new FormControl('', Validators.required),
      'salaryMax': new FormControl('', Validators.required),
      'idArea': new FormControl('', Validators.required),
      'description': new FormControl('', [Validators.required, noWhiteSpace]),
      'career': new FormControl(''),
      'newCareer': new FormArray([
        new FormGroup({
          'name': new FormControl({ value: '', disabled: true })
        })
      ]),
      'hardSkill': new FormControl(''),
      'newHardSkill': new FormArray([
        new FormGroup({
          'name': new FormControl({ value: '', disabled: true })
        })
      ]),
      'process': new FormArray([
        new FormGroup({
          'name': new FormControl('', Validators.required)
        })
      ]),
      'recruiter': new FormControl(''),
      'placeNumber': new FormControl('')

    })
  }



  ngOnInit() {
    this.serv.Area.GetAll().subscribe(dat => {
      this.areas = <AreaI[]>dat.body;
      this.serv.Skill.GetAll(0).subscribe(dat => {
        this.skillsHard = <SkillI[]>dat.body;
        this.serv.Career.GetAll().subscribe(dat => {
          this.careers = <CareerI[]>dat.body;
          console.log(dat);
          this.serv.Recruiter.GetAll().subscribe(dat => {
            this.recruiters = <RecruiterI[]>dat.body;

            this.filteredCareerCtrl.next(this.careers.slice());
            this.filteredSkillHardCtrl.next(this.skillsHard.slice());
            this.filteredRecruiterCtrl.next(this.recruiters.slice());

            this.searchCareer.valueChanges.
              pipe(takeUntil(this._onDestroy))
              .subscribe(() => {
                this.filterMulti(1);
              });
            this.searchSkillHard.valueChanges.
              pipe(takeUntil(this._onDestroy))
              .subscribe(() => {
                this.filterMulti(2);
              });
            this.searchRecruiter.valueChanges.
              pipe(takeUntil(this._onDestroy))
              .subscribe(() => {
                this.filterMulti(3);
              });

          })
        })
      });
    }, err => {
      this.dialogRef.close();
    });
    this.nameEmpresa = this.serv.Company.GetLocal();

    this.filteredCareerCtrl.subscribe(d => {
      this.emptySearchCareer = (d.length == 0);
    });
    this.filteredSkillHardCtrl.subscribe(d => {
      this.emptySearchSkillHard = (d.length == 0);
    });
    this.filteredRecruiterCtrl.subscribe(d => {
      this.emptySearchRecruiter = (d.length == 0);
    });

  }

  ngAfterViewInit() {
    this.setInitialValue();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.filteredCareerCtrl.unsubscribe();
    this.filteredRecruiterCtrl.unsubscribe();
    this.filteredSkillHardCtrl.unsubscribe();
  }


  filterMulti(cod: number) {
    let search = "";
    switch (cod) {
      case 1:
        if (!this.careers)
          return;
        search = this.searchCareer.value;
        if (!search) {
          this.filteredCareerCtrl.next(this.careers.slice());
          return;
        } else {
          search = search.toLowerCase();
        }
        this.filteredCareerCtrl.next(
          this.careers.filter(career => career.name.toLowerCase().indexOf(search) > -1)
        );
        break
      case 2:
        if (!this.skillsHard)
          return;
        search = this.searchSkillHard.value;
        if (!search) {
          this.filteredSkillHardCtrl.next(this.skillsHard.slice());
          return;
        } else {
          search = search.toLowerCase();
        }
        this.filteredSkillHardCtrl.next(
          this.skillsHard.filter(sk => sk.name.toLowerCase().indexOf(search) > -1)
        );
        break
      case 3:
        if (!this.recruiters)
          return;
        search = this.searchRecruiter.value;
        if (!search) {
          this.filteredRecruiterCtrl.next(this.recruiters.slice());
          return;
        } else {
          search = search.toLowerCase();
        }
        this.filteredRecruiterCtrl.next(
          this.recruiters.filter(sk => sk.name.toLowerCase().indexOf(search) > -1)
        );
        break
    }
  }

  setInitialValue() {
    this.filteredCareerCtrl
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.multiSelectCareer.compareWith = (a: CareerI, b: CareerI) => a && b && a.id === b.id;
      })
    this.filteredSkillHardCtrl
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.multiSelectSkillHard.compareWith = (a: CareerI, b: CareerI) => a && b && a.id === b.id;
      })
    this.filteredRecruiterCtrl
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.multiSelectRecruiter.compareWith = (a: CareerI, b: CareerI) => a && b && a.id === b.id;
      })

  }

  save() {
    this.newHardSkills = JSON.parse(JSON.stringify(this.form.controls['newHardSkill'].value));
    this.newcareers = JSON.parse(JSON.stringify(this.form.controls['newCareer'].value));
    console.log(this.newHardSkills,this.newcareers);
    this.form.markAllAsTouched(); 
    if (this.form.valid) {
      
      if (parseInt(this.form.get('salaryMin').value) >= parseInt(this.form.get('salaryMax').value)) {
        swal.fire('Datos erroneos', "El rango de salario es incorrecto", 'error');
      } else {
        if ((this.form.get('career').value == "" || this.form.get('career').value.length == 0) && (this.form.get('newCareer').value.length == 0 || this.form.get('newCareer').value[0].name.trim() == "")) {
          swal.fire('Datos imcompletos', "Debe ingresar carreras", 'error');
        } else if ((this.form.get('hardSkill').value == "" || this.form.get('hardSkill').value.length == 0) && (this.form.get('newHardSkill').value.length == 0 || this.form.get('newHardSkill').value[0].name.trim() == "")) {
          swal.fire('Datos imcompletos', "Debe ingresar habilidades", 'error');
        } else {
          if ((this.form.get('placeNumber').value == "" || this.form.get('placeNumber').value == null)) {
            swal.fire('Datos imcompletos', "Debe ingresar los puestos disponibles", 'error');
          } else if ((this.form.get('recruiter').value == "" || this.form.get('recruiter').value.length == 0)) {
            swal.fire('Datos imcompletos', "Debe ingresar al menos un reclutador", 'error');
          } else {
            let jobPosition: JobsI = this.obJobI(JSON.parse(JSON.stringify(this.form.value)));

            this.serv.JobPosition.Post(jobPosition).subscribe(dat => {
              swal.fire('Registro', 'Registro correctamente de Cargo', 'success');
              this.dialogRef.close(this.form.value);
            })

          }
        }


      }


    } else {
      console.log("invalidoooo")
    }
  }

  obJobI(value: any) {
    console.log(this.newcareers,this.newHardSkills);
    
    if (isString(value.career))
      value.career = [];
    if (isString(value.hardSkill))
      value.hardSkill = []
    if (isString(value.recruiter))
      value.recruiter = [];

    if (isArray(value.newCareer) && (value.newCareer).length != 0 && (<string>value.newCareer[0].name).trim() == "") {
      value.newCareer.splice(0, 1);
    } else { value.newCareer = [] }
    if (isArray(value.newHardSkill) && (value.newHardSkill).length != 0 && (<string>value.newHardSkill[0].name).trim() == "") {
      value.newHardSkill.splice(0, 1);
    } else { value.newHardSkill = [] }
    let pos: JobsI = JSON.parse(JSON.stringify(value));
   
    pos.newCareersName = []; pos.careersId = []; pos.hardSkillsId = [];
    pos.newHardSkillsName = []; pos.recruitersId = []; pos.processesName = [];
    for (let a of this.newcareers) { if(a.name.trim()!="") pos.newCareersName.push(a.name.toLocaleUpperCase()); } delete pos.newCareer;
    for (let a of this.newHardSkills) { if(a.name.trim()!="") pos.newHardSkillsName.push(a.name.toLocaleUpperCase()); } delete pos.newHardSkill;
    for (let a of pos.career) { pos.careersId.push(a.id); } delete pos.career;
    for (let a of pos.hardSkill) { pos.hardSkillsId.push(a.id); } delete pos.hardSkill;
    for (let a of pos.recruiter) { pos.recruitersId.push(a.id); } delete pos.recruiter;
    for (let a of pos.process) { pos.processesName.push(a.name); } delete pos.process;


    pos.placesNumber = pos.placeNumber; delete pos.placeNumber;
    console.log(pos);


    return pos;
  }

  selectChange(e, type: number) {

    switch (type) {
      case 1:
        this.careersSelected = e;
        break;
      case 2:
        this.skillsHardSelected = e;
        break;
      case 3:
        this.recruitersSelected = e;
        break;
    }
  }


  addOption(type: number) {
    switch (type) {
      case 1:
        if ((<FormArray>this.form.get('newCareer')).length == 1) {
          (<FormGroup>(<FormArray>this.form.get('newCareer')).at(0)).controls["name"].setValidators([Validators.required, noWhiteSpace]);
          (<FormGroup>(<FormArray>this.form.get('newCareer')).at(0)).controls["name"].updateValueAndValidity()
        }
        (<FormArray>this.form.get('newCareer')).push(
          new FormGroup({
            'name': new FormControl({ value: '', disabled: true }, [Validators.required, noWhiteSpace])
          })
        );

        console.log((<FormGroup>(<FormArray>this.form.get('newCareer')).at(0)));
        break;
      case 2:

        if ((<FormArray>this.form.get('newHardSkill')).length == 1) {
          (<FormGroup>(<FormArray>this.form.get('newHardSkill')).at(0)).controls["name"].setValidators([Validators.required, noWhiteSpace]);
          (<FormGroup>(<FormArray>this.form.get('newHardSkill')).at(0)).controls["name"].updateValueAndValidity()
        }

        (<FormArray>this.form.get('newHardSkill')).push(
          new FormGroup({
            'name': new FormControl({ value: '', disabled: true }, [Validators.required, noWhiteSpace])
          })
        );
        break;
      case 4:
        (<FormArray>this.form.get('process')).push(
          new FormGroup({
            'name': new FormControl('', [Validators.required, noWhiteSpace])
          })
        )
        break;
    }
  }
  removeOption(type: number, i: number) {
    switch (type) {
      case 1:
        if ((<FormArray>this.form.get('newCareer')).length > 1) {
          (<FormArray>this.form.get('newCareer')).removeAt(i);
        } else {
          (<FormArray>this.form.get('newCareer')).at(0).setValue({ name: '' });
        }
        break;
      case 2:
        if ((<FormArray>this.form.get('newHardSkill')).length > 1) {
          (<FormArray>this.form.get('newHardSkill')).removeAt(i);
        } else {
          (<FormArray>this.form.get('newHardSkill')).at(0).setValue({ name: '' });
        }

        break;
      case 4:
        (<FormArray>this.form.get('process')).removeAt(i);
        break;
    }
  }

  addOption_2(type: number) {
    switch (type) {
      case 1:

        if ((<FormArray>this.form.get('newCareer')).at(0).get('name').value.trim() == "") {
          (<FormArray>this.form.get('newCareer')).at(0).get('name').setValue(this.searchCareer.value);
        } else {
          if ((<FormArray>this.form.get('newCareer')).length == 1) {
            (<FormGroup>(<FormArray>this.form.get('newCareer')).at(0)).controls["name"].setValidators([Validators.required, noWhiteSpace]);
            (<FormGroup>(<FormArray>this.form.get('newCareer')).at(0)).controls["name"].updateValueAndValidity()
          }
          (<FormArray>this.form.get('newCareer')).push(
            new FormGroup({
              'name': new FormControl({ value: this.searchCareer.value, disabled: true }, [Validators.required, noWhiteSpace])
            })
          )
        }
        this.searchCareer.setValue('');
        break;
      case 2:

        if ((<FormArray>this.form.get('newHardSkill')).at(0).get('name').value.trim() == "") {
          (<FormArray>this.form.get('newHardSkill')).at(0).get('name').setValue(this.searchSkillHard.value);
        } else {
          if ((<FormArray>this.form.get('newHardSkill')).length == 1) {
            (<FormGroup>(<FormArray>this.form.get('newHardSkill')).at(0)).controls["name"].setValidators([Validators.required, noWhiteSpace]);
            (<FormGroup>(<FormArray>this.form.get('newHardSkill')).at(0)).controls["name"].updateValueAndValidity()
          }
          (<FormArray>this.form.get('newHardSkill')).push(
            new FormGroup({
              'name': new FormControl({ value: this.searchSkillHard.value, disabled: true }, [Validators.required, noWhiteSpace])
            })
          )
        }
        this.searchSkillHard.setValue('');
        break;
    }

  }


}
