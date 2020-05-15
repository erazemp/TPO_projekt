import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { TeachingLavbicPodatkiService } from "../../storitve/teaching-lavbic-podatki.service";
import { StreznikPodatkiService } from "../../storitve/streznik-podatki.service";
import {Globals} from "../../../globals";

@Component({
  selector: 'app-domaca-stran',
  templateUrl: './domaca-stran.component.html',
  styleUrls: ['./domaca-stran.component.css']
})
export class DomacaStranComponent implements OnInit {

  constructor(private title: Title,
              private teachingService: TeachingLavbicPodatkiService,
              private streznikService: StreznikPodatkiService,
              private globals: Globals) {
    title.setTitle("Stockbotics");
  }

  private pridobiPodatkeODelnicah(): void {
    let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    if (this.globals.datumZadnjeOsvezitve == null) {
      // todo: izvedi API klic in shrani v bazo
      this.globals.datumZadnjeOsvezitve = today;
      return;
    }
    if (this.globals.datumZadnjeOsvezitve.getTime() != today.getTime()) {
      // todo: izvedi API klic in shrani v bazo
      this.globals.datumZadnjeOsvezitve = today;
    } else {
      // todo: ne izvedi API klica, ampak samo poglej v bazo
    }
  }

  ngOnInit() {
    this.pridobiPodatkeODelnicah();
  }

}
