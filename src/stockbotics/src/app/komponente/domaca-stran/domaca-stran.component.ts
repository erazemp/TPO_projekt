import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { StreznikPodatkiService } from "../../storitve/streznik-podatki.service";
import {Globals} from "../../../globals";
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
              private globals: Globals) {
    title.setTitle("Stockbotics");
  }

  private prikaziDomacoStran(): void {
    this.streznikService.prikaziDomacoStran()
      .then(odgovor => {
        this.seznamPodjetij = odgovor;
      });
  }

  ngOnInit() {
    this.prikaziDomacoStran();
  }

}
