import { Component, OnInit } from '@angular/core';
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {

  constructor(private streznikPodatki: StreznikPodatkiService) { }

  ngOnInit() {
  }

  public click(): void {
    this.streznikPodatki.vstaviDb();
  }

}
