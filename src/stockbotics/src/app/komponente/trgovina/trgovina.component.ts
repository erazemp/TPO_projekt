import { Component, OnInit } from '@angular/core';
import {Bot} from "../../razredi/bot";
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-trgovina',
  templateUrl: './trgovina.component.html',
  styleUrls: ['./trgovina.component.css']
})
export class TrgovinaComponent implements OnInit {
  boti: Bot[];

  constructor(private streznikPodatki: StreznikPodatkiService,
              private route: ActivatedRoute,
              private title: Title) {
    title.setTitle("Trgovina");
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

  ngOnInit() {
    this.getVsiBoti();
  }

}
