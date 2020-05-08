import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistracijaComponent } from './komponente/registracija/registracija.component';
import {FormsModule} from "@angular/forms";
import { OgrodjeComponent } from './komponente/ogrodje/ogrodje.component';
import { AppUsmerjanjeModule } from './moduli/app-usmerjanje/app-usmerjanje.module';

@NgModule({
  declarations: [
    AppComponent,
    RegistracijaComponent,
    OgrodjeComponent
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
