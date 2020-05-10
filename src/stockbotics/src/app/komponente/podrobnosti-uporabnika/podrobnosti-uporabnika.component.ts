import {Component, Input, OnInit} from '@angular/core';
import {Uporabnik} from "../../razredi/uporabnik";

@Component({
  selector: 'app-podrobnosti-uporabnika',
  templateUrl: './podrobnosti-uporabnika.component.html',
  styleUrls: ['./podrobnosti-uporabnika.component.css']
})
export class PodrobnostiUporabnikaComponent implements OnInit {

  @Input() uporabnik: Uporabnik;

  constructor() { }

  public izbrisiUporabnika(): void {

  }

  ngOnInit() {
  }

}
