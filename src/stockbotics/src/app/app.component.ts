import {Component, OnInit} from '@angular/core';
import {StreznikPodatkiService} from "./storitve/streznik-podatki.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stockbotics';
  odgovor: string;

  constructor(private streznikPodatki: StreznikPodatkiService) {
  }

  public helloWorld(): void {
      this.streznikPodatki
        .helloWorld()
        .then(odgovor => this.odgovor = odgovor["odgovor"]);
  }

  ngOnInit(): void {
    this.helloWorld();
  }
}
