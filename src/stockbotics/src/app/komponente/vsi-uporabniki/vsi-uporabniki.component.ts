import {Component, OnInit} from '@angular/core';
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {Uporabnik} from "../../razredi/uporabnik";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-vsi-uporabniki',
  templateUrl: './vsi-uporabniki.component.html',
  styleUrls: ['./vsi-uporabniki.component.css']
})
export class VsiUporabnikiComponent implements OnInit {
  uporabniki: Uporabnik[];

  constructor(private streznikPodatki: StreznikPodatkiService,
              private route: ActivatedRoute) {
  }

  public getVsiUporabniki(): void {
    this.route.paramMap
      .pipe(
        switchMap((params:ParamMap) => {
          return this.streznikPodatki.vrniVseUporabnike();
        })
      ).subscribe(najdeniUporabniki => {
        this.uporabniki = najdeniUporabniki;
    })
  }

  ngOnInit() {
    this.getVsiUporabniki();
  }

}
