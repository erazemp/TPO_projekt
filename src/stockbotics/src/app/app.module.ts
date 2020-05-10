import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistracijaComponent } from './komponente/registracija/registracija.component';
import {FormsModule} from "@angular/forms";
import { OgrodjeComponent } from './komponente/ogrodje/ogrodje.component';
import { AppUsmerjanjeModule } from './moduli/app-usmerjanje/app-usmerjanje.module';
import { PrijavaComponent } from './komponente/prijava/prijava.component';
import { OgledProfilaComponent } from './komponente/ogled-profila/ogled-profila.component';
import { FooterComponent } from './komponente/footer/footer.component';
import { DomacaStranComponent } from './komponente/domaca-stran/domaca-stran.component';
import { PodrobnostiUporabnikaComponent } from './komponente/podrobnosti-uporabnika/podrobnosti-uporabnika.component';
import { VsiUporabnikiComponent } from './komponente/vsi-uporabniki/vsi-uporabniki.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistracijaComponent,
    OgrodjeComponent,
    OgledProfilaComponent,
    PrijavaComponent,
    FooterComponent,
    DomacaStranComponent,
    PodrobnostiUporabnikaComponent,
    VsiUporabnikiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppUsmerjanjeModule
  ],
  providers: [],
  bootstrap: [OgrodjeComponent]
})
export class AppModule { }
