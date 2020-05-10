import {Component, Inject, OnInit} from '@angular/core';
import {Uporabnik} from '../../razredi/uporabnik';
import {AvtentikacijaService} from '../../storitve/avtentikacija.service';
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {SHRAMBA_BRSKALNIKA} from "../../razredi/shramba";


@Component({
  selector: 'app-ogled-profila',
  templateUrl: './ogled-profila.component.html',
  styleUrls: ['./ogled-profila.component.css']
})
export class OgledProfilaComponent implements OnInit {

  public uporabnik : Uporabnik;
  constructor(private avtentikacijaService: AvtentikacijaService, private pot: ActivatedRoute, private router: Router,
              private streznikPodatkiStoritev: StreznikPodatkiService) { }

  public vrniUporabnika() {

    this.uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();

    console.log(this.uporabnik._id);
    console.log(this.uporabnik.uporabniskoIme);

    // return uporabnik ? uporabnik.username : 'Gost';
  }
  ngOnInit() {
    console.log("Vrni uporabnika za ogled profila");
    this.vrniUporabnika();
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('idUporabnika');
          console.log("OnInit uredi profil "+ id);
          return this.streznikPodatkiStoritev.pridobiUporabnika(this.uporabnik._id);

        }))
      .subscribe((uporabnik: Uporabnik) => {
        this.uporabnik = uporabnik;
        console.log(uporabnik);
      });
  }

}
