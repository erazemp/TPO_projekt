import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {RegistracijaComponent} from '../../komponente/registracija/registracija.component';
import {PrijavaComponent} from "../../komponente/prijava/prijava.component";
import {OgledProfilaComponent} from "../../komponente/ogled-profila/ogled-profila.component";
import {UrediProfilComponent} from "../../komponente/uredi-profil/uredi-profil.component";
import {VsiUporabnikiComponent} from "../../komponente/vsi-uporabniki/vsi-uporabniki.component";
import {DbComponent} from "../../komponente/db/db.component";

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
  }, {
    path: 'profil/:idUporabnika',
    component: UrediProfilComponent
  }, {
    path: 'uporabniki',
    component: VsiUporabnikiComponent
  }, {
    path: 'db',
    component: DbComponent
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
export class AppUsmerjanjeModule {
}
