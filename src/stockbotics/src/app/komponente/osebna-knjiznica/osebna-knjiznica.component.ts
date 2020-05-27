import { Component, OnInit } from '@angular/core';
import {Bot} from "../../razredi/bot";
import {Uporabnik} from "../../razredi/uporabnik";
import {AvtentikacijaService} from "../../storitve/avtentikacija.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {Title} from "@angular/platform-browser";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-osebna-knjiznica',
  templateUrl: './osebna-knjiznica.component.html',
  styleUrls: ['./osebna-knjiznica.component.css']
})
export class OsebnaKnjiznicaComponent implements OnInit {
  boti: Bot[];
  osebnaKnjiznica: Bot[] = [];
  public uporabnik : Uporabnik;

  constructor(private avtentikacijaService: AvtentikacijaService,
              private pot: ActivatedRoute,
              private router: Router,
              private streznikPodatki: StreznikPodatkiService,
              private route: ActivatedRoute,
              private title: Title) {
    title.setTitle("Osebna knjiznica");
  }

  public getVsiBoti(): void {
    this.route.paramMap
      .pipe(
        switchMap((params:ParamMap) => {
          return this.streznikPodatki.vrniVseBote();
        })
      ).subscribe(najdeniBoti => {
      this.boti = najdeniBoti;
    })
  }

  public vrniUporabnika() {
    this.uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();
  }

  public pridobiOsebnoKnjiznico() {
    for(let i=0; i<this.boti.length; i++){
      //console.log(this.uporabnik.seznamBotov);
      //console.log("trenutni bot" + this.boti[i]._id);
      if(this.uporabnik.seznamBotov.includes(this.boti[i]._id)) {
          console.log("osebna kniznica " + this.osebnaKnjiznica);
          console.log("pushaj bota " + this.boti[i]);
          this.osebnaKnjiznica.push(this.boti[i]);
      }
    }
  }

  ngOnInit() {
    this.getVsiBoti();

    this.vrniUporabnika();
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('idUporabnika');
          console.log("OnInit uredi profil "+ id);
          return this.streznikPodatki.pridobiUporabnika(this.uporabnik._id);

        }))
      .subscribe((uporabnik: Uporabnik) => {
        this.uporabnik = uporabnik;
        this.pridobiOsebnoKnjiznico();
      });
  }

}