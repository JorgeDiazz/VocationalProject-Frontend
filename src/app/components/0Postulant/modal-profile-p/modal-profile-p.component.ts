import { Component, OnInit, ViewChild } from '@angular/core';
import { PostulantI, CareerI } from '../../../models/models.model';
import { ServiceService } from '../../../services/service.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { noWhiteSpace } from 'src/app/components/Validator/validators.validators';
import swal from 'sweetalert2';
import { MatSelect } from '@angular/material';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { isArray, isString } from 'util';
@Component({
  selector: 'app-modal-profile-p',
  templateUrl: './modal-profile-p.component.html',
  styleUrls: ['./modal-profile-p.component.css']
})
export class ModalProfilePComponent implements OnInit {

  postulantProfile:PostulantI;
  form: FormGroup;
  update: boolean = false;
  careers: CareerI[];
  careersSelected: CareerI[];

  @ViewChild('multiSelectCareer', { static: false }) multiSelectCareer: MatSelect;

  protected _onDestroy = new Subject<void>();
  filteredCareerCtrl: ReplaySubject<CareerI[]> = new ReplaySubject<CareerI[]>(1);

  emptySearchCareer = false;
  searchCareer: FormControl = new FormControl('');

  constructor(private serv:ServiceService) {
    this.getPostulant();
    this.careersSelected=this.postulantProfile.careers;
   }

  ngOnInit() {
    this.initForm();
    this.serv.Career.GetAll().subscribe(dat => {
      this.careers = <CareerI[]>dat.body;
      this.filteredCareerCtrl.next(this.careers.slice());
      this.searchCareer.valueChanges.
              pipe(takeUntil(this._onDestroy))
              .subscribe(() => {
                this.filterMulti(1);
              });
    });
    this.filteredCareerCtrl.subscribe(d => {
      this.emptySearchCareer = (d.length == 0);
    });
  }

  initForm(){
    this.form = new FormGroup({
      'id':new FormControl({ value: this.postulantProfile.id, disabled: true }, Validators.required),
      'name': new FormControl(this.postulantProfile.name,[Validators.required, noWhiteSpace]),
      'email': new FormControl(this.postulantProfile.email, [Validators.required,noWhiteSpace, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      'career': new FormControl('')
    });
  }

  updateProfile(tip: number) {
    if (tip == 0) {
      this.update=true;
      this.initForm();
    } else {
      let rec:PostulantI=this.form.value;
      this.form.markAllAsTouched();
      if(this.form.valid){
        this.updatePostulant(rec);   
      }
      
    }
    
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.filteredCareerCtrl.unsubscribe();
  }

  filterMulti(cod: number) {
    let search = "";
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
    }

    setInitialValue() {
      this.filteredCareerCtrl
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          this.multiSelectCareer.compareWith = (a: CareerI, b: CareerI) => a && b && a.id === b.id;
        })
      }

      save() {
        this.newcareers = JSON.parse(JSON.stringify(this.form.controls['newCareer'].value));
        this.form.markAllAsTouched(); 
        if (this.form.valid) {
            if ((this.form.get('career').value == "" || this.form.get('career').value.length == 0) && (this.form.get('newCareer').value.length == 0 || this.form.get('newCareer').value[0].name.trim() == "")) {
              swal.fire('Datos imcompletos', "Debe ingresar carreras", 'error');
            }
        } else {
          console.log("invalidoooo")
        }
      }

      obJobI(value: any) {
        console.log(this.newcareers,this.newHardSkills);
        
        if (isString(value.career))
          value.career = [];
    
        if (isArray(value.newCareer) && (value.newCareer).length != 0 && (<string>value.newCareer[0].name).trim() == "") {
          value.newCareer.splice(0, 1);
        } else { value.newCareer = [] }

        let pos: JobsI = JSON.parse(JSON.stringify(value));
       
        pos.newCareersName = []; pos.careersId = []; pos.hardSkillsId = [];
        pos.newHardSkillsName = []; pos.recruitersId = []; pos.processesName = [];
        for (let a of this.newcareers) { if(a.name.trim()!="") pos.newCareersName.push(a.name.toLocaleUpperCase()); } delete pos.newCareer;
        for (let a of pos.career) { pos.careersId.push(a.id); } delete pos.career;
    
    
        pos.placesNumber = pos.placeNumber; delete pos.placeNumber;
        console.log(pos);
    
    
        return pos;
      }
    
      selectChange(e, type: number) {
            this.careersSelected = e;
        }
      
    
    
      addOption(type: number) {

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

      }
      removeOption(type: number, i: number) {

            if ((<FormArray>this.form.get('newCareer')).length > 1) {
              (<FormArray>this.form.get('newCareer')).removeAt(i);
            } else {
              (<FormArray>this.form.get('newCareer')).at(0).setValue({ name: '' });
            }           
      }
    
      addOption_2(type: number) {

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
      }

  updatePostulant(rec:PostulantI){

    let ob:any={};    
    ob.id=this.postulantProfile.id;
    
    if(rec.name!==this.postulantProfile.name){
      ob.name=rec.name;
    } 
    if(rec.email!==this.postulantProfile.email){
      ob.email=rec.email.trim();
    }
    this.serv.Recruiter.Put(ob).subscribe(dat=>{
      swal.fire('Actualización', 'Los datos fueron actualizados correctamente', 'success');      
      console.log(dat);
      let ob:any;
      ob=dat.body;
      this.serv.Postulant.PutLocal(ob); 
      this.getPostulant();
      this.update = false;
    })
  }
  getPostulant(){
    this.postulantProfile=this.serv.Postulant.GetLocal();
  }

}
