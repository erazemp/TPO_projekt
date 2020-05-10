import {Component, OnInit} from '@angular/core';
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {Uporabnik} from "../../razredi/uporabnik";

@Component({
  selector: 'app-vsi-uporabniki',
  templateUrl: './vsi-uporabniki.component.html',
  styleUrls: ['./vsi-uporabniki.component.css']
})
export class VsiUporabnikiComponent implements OnInit {
  uporabniki: Uporabnik[];

  constructor(private streznikPodatki: StreznikPodatkiService) {
  }

  public getVsiUporabniki(): void {
    this.streznikPodatki
      .vrniVseUporabnike()
      .then(uporabniki => this.uporabniki = uporabniki);
  }

  ngOnInit() {
    this.getVsiUporabniki();
  }

}
