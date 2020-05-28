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
    this.streznikService.prikaziZgodovinskePodatke(podjetje.simbol)
      .then(odgovor => {
        console.log(odgovor);
      });
  }

  ngOnInit() {
    this.prikaziDomacoStran();
  }

}
