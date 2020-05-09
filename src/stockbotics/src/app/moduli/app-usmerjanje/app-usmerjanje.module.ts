import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegistracijaComponent } from '../../komponente/registracija/registracija.component';
import {PrijavaComponent} from "../../komponente/prijava/prijava.component";
import {OgledProfilaComponent} from "../../komponente/ogled-profila/ogled-profila.component";

const poti: Routes = [
  {
    path: 'registracija',
    component: RegistracijaComponent
  }, {
    path: 'prijava',
    component: PrijavaComponent
  }, {
    path: 'profil',
    component: OgledProfilaComponent
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
