import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VacantI } from 'src/app/models/models.model';
import { ServiceService } from '../../../services/service.service';
import { CareerI } from '../../../models/models.model';

import { MatSelect } from '@angular/material';
import { Subject, ReplaySubject } from 'rxjs';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ModalVacantComponent } from './modal-vacant/modal-vacant.component';
@Component({
  selector: 'app-vacant',
  templateUrl: './vacant.component.html',
  styleUrls: ['./vacant.component.css']
})
export class VacantComponent implements OnInit {
  @ViewChild('multiSelectCareer', { static: false }) multiSelectCareer: MatSelect;
  vacants: VacantI[];
  careers: CareerI[]; 
  careersSelected: CareerI[] = [];

  //<-- Mat Select Career-->
  protected _onDestroy = new Subject<void>();
  filteredCareerCtrl: ReplaySubject<CareerI[]> = new ReplaySubject<CareerI[]>(1);
  emptySearchCareer = false;
  searchCareer: FormControl = new FormControl('');
  //<-- END Mat Select Career-->
  constructor(public dialog: MatDialog, private serv: ServiceService) {

  }

  ngOnInit() {
    this.serv.Career.GetAll().subscribe((dat) => {
      this.careers = <CareerI[]>dat.body;
      this.filteredCareerCtrl.next(this.careers.slice());
      this.searchCareer.valueChanges.
        pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterMultiCarrer();
        });

    });
  }
  /**
   * Method for MatSelect careers
   */
  filterMultiCarrer() {
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

  verModal(id: string) {
    const dialogRef = this.dialog.open(ModalVacantComponent, {
      width: '450px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.verVacantes(this.careers);
    });
  }


  filterVacant() {
    console.log(this.careersSelected);
    this.serv.Vacant.GetByCarrers(this.careersSelected).subscribe(dat=>{
      this.vacants=<VacantI[]>dat.body;
      console.log(dat.body);
    });
  }

  selectChange(e) {
    this.careersSelected = e;
  }

  verVacantes(careers: CareerI[]) {
    //SERVICIO PARA TRAER VACANTES POR CADA CARRERA DE POSTULANTE
  }
}
