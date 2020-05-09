import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegistracijaComponent } from '../../komponente/registracija/registracija.component';
import {PrijavaComponent} from "../../komponente/prijava/prijava.component";
import {DomacaStranComponent} from "../../komponente/domaca-stran/domaca-stran.component";

const poti: Routes = [
  {
    path: '',
    component: DomacaStranComponent
  },
  {
    path: 'registracija',
    component: RegistracijaComponent
  }, {
    path: 'prijava',
    component: PrijavaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(poti)
  ],
  exports: [RouterModule]
})
export class AppUsmerjanjeModule { }
