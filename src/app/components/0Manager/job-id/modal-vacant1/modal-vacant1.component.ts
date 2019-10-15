import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { RecruiterI, VacantI } from 'src/app/models/models.model';
import { ServiceService } from 'src/app/services/service.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { CareerI } from '../../../../models/models.model';
import { isString } from 'util';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-modal-vacant1',
  templateUrl: './modal-vacant1.component.html',
  styleUrls: ['./modal-vacant1.component.css']
})
export class ModalVacant1Component implements OnInit {
  recruiters: RecruiterI[];
  recruitersSelected: RecruiterI[];

  @ViewChild('multiSelectRecruiter', { static: false }) multiSelectRecruiter: MatSelect;
  protected _onDestroy = new Subject<void>();
  filteredRecruiterCtrl: ReplaySubject<RecruiterI[]> = new ReplaySubject<RecruiterI[]>(1);

  emptySearchRecruiter = false;
  searchRecruiter: FormControl = new FormControl('');
  vacant:VacantI;
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<ModalVacant1Component>,public serv: ServiceService, private _route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.form = new FormGroup({
      'placesNumber': new FormControl('', Validators.required),
      'recruiters': new FormControl('')
    });

    this.serv.Recruiter.GetAll().subscribe(dat => {
      this.recruiters = <RecruiterI[]>dat.body;
    })

  }

  addVacant(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }

  ngOnInit() {
    this.serv.Recruiter.GetAll().subscribe(dat => {
      this.recruiters = <RecruiterI[]>dat.body;

      this.filteredRecruiterCtrl.next(this.recruiters.slice());

      this.searchRecruiter.valueChanges.
        pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterMulti();
        });

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
    this.filteredRecruiterCtrl.unsubscribe();
  }

  filterMulti() {
    let search = "";
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
        )
  }

  setInitialValue() {
    this.filteredRecruiterCtrl
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.multiSelectRecruiter.compareWith = (a: CareerI, b: CareerI) => a && b && a.id === b.id;
      })

  }

  obVacantI(value: any) {
    if (isString(value.recruiter))
      value.recruiter = [];
    let vacant: VacantI = value;  
    vacant.recruitersId=[];
    for(let a of vacant.recruiters){vacant.recruitersId.push(a.id); } delete vacant.recruiters;
    console.log(JSON.stringify(vacant));
    return vacant;
  }

  save() {
    this.form.markAllAsTouched();
    console.log(this.form);
    console.log(this.form.value);
    if (this.form.valid) {
     

          if ((this.form.get('recruiters').value != "" || this.form.get('recruiters').value.length != 0) && (this.form.get('placesNumber').value == "" || this.form.get('placesNumber').value == null)) {
            swal.fire('Datos imcompletos', "Debe ingresar los puestos disponibles", 'error');
          } else if ((this.form.get('recruiters').value == "" || this.form.get('recruiters').value.length == 0) && (this.form.get('placesNumber').value != "")) {
            swal.fire('Datos imcompletos', "Debe ingresar al menos un reclutador", 'error');
          } else if ((this.form.get('recruiters').value != "" || this.form.get('recruiters').value.length == 0) && (this.form.get('placesNumber').value <=0)) {
            swal.fire('Datos imcompletos', "Debe ingresar un número válido", 'error');
          } else {
            let vacant: VacantI = this.obVacantI(this.form.value);
           this.serv.Vacant.Post(vacant,Number(this.data.job)).subscribe(dat => {
            if(dat.status==200){
              swal.fire('Vacante creada', "se creó correctamente", 'success');
              this.dialogRef.close();
            }else if(dat.status==409){
              swal.fire('Vacante no creada', "conflictos en la base de datos", 'error');
            }else if(dat.status==417){
              swal.fire('Vacante no creada', "los datos que ingresó no son correctos", 'error');
            }
            })
            //this.dialogRef.close(this.form.value);
          }

    } else {
      console.log("invalidoooo")
    }
  }

  selectChange(e, type: number) {

    switch (type) {
      case 3:
        this.recruitersSelected = e;
        break;
    }
  }

}
