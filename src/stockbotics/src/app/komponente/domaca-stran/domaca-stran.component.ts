import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {Podjetje} from "../../razredi/podjetje";
import {ZgodovinskiPodatek} from "../../razredi/zgodovinskiPodatek";

@Component({
  selector: 'app-domaca-stran',
  templateUrl: './domaca-stran.component.html',
  styleUrls: ['./domaca-stran.component.css']
})
export class DomacaStranComponent implements OnInit {

  private seznamPodjetij: Array<Podjetje>;
  private trenutnePodjetjeDelnice: Array<ZgodovinskiPodatek>;
  private trenutnoPodjetjeIme: string;

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

  private imaTrenutnoPodjetjePodatkeODelnicah() {
    if (this.trenutnePodjetjeDelnice != null && Array.isArray(this.trenutnePodjetjeDelnice) && this.trenutnePodjetjeDelnice.length > 0)
      return true;
    else
      return false;
  }

  private pridobiZgodovinskePodatkePodjetja(podjetje: Podjetje): void {
    this.streznikService.prikaziZgodovinskePodatke(podjetje.simbol)
      .then(odgovor => {
        this.trenutnePodjetjeDelnice = odgovor;
        this.trenutnoPodjetjeIme = podjetje.ime;
        console.log("trenutna delnica:");
        console.log(this.trenutnePodjetjeDelnice);
      });
  }

  ngOnInit() {
    this.prikaziDomacoStran();
  }

}
