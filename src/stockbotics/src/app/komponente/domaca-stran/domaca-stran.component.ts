import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {Podjetje} from "../../razredi/podjetje";

@Component({
  selector: 'app-domaca-stran',
  templateUrl: './domaca-stran.component.html',
  styleUrls: ['./domaca-stran.component.css']
})
export class DomacaStranComponent implements OnInit {

  private seznamPodjetij: Array<Podjetje>;
  private timeFrame: number = 10;

  constructor(private title: Title,
              private streznikService: StreznikPodatkiService,
              private datePipe: DatePipe) {
    title.setTitle("Stockbotics");
  }

  private prikaziDomacoStran(): void {
    this.streznikService.prikaziDomacoStran()
      .then(odgovor => {
        this.seznamPodjetij = odgovor;
      });
  }

  private pridobiZgodovinskePodatkePodjetja(podjetje: Podjetje): void {
    // zadnji dan, kjer so podatki na API-ju je 22.1.2020, zato se kot danasnji datum vzame 22.1.2020
    const datum: Date = new Date(2020, 0, 22);
    const datumOd: number = datum.setDate(datum.getDate() - this.timeFrame);
    const datumDo: Date = new Date(2020, 0, 22);
    this.streznikService.prikaziZgodovinskePodatke(podjetje.simbol, this.datePipe.transform(datumOd, 'yyyy-MM-dd'), this.datePipe.transform(datumDo, 'yyyy-MM-dd'))
      .then(odgovor => {
        console.log(odgovor);
      });
  }

  ngOnInit() {
    this.prikaziDomacoStran();
  }

}
