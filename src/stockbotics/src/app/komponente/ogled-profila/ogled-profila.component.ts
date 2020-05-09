import { Component, OnInit } from '@angular/core';
import {Uporabnik} from '../../razredi/uporabnik';
import {AvtentikacijaService} from '../../storitve/avtentikacija.service';

@Component({
  selector: 'app-ogled-profila',
  templateUrl: './ogled-profila.component.html',
  styleUrls: ['./ogled-profila.component.css']
})
export class OgledProfilaComponent implements OnInit {

  public uporabnik : Uporabnik;
  constructor(private avtentikacijaService: AvtentikacijaService) { }

  public vrniUporabnika() {
    this.uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();
    // console.log(this.uporabnik);
    // return uporabnik ? uporabnik.username : 'Gost';
  }
  ngOnInit() {
    this.vrniUporabnika();
  }

}
