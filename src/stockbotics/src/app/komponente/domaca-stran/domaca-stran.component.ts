import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-domaca-stran',
  templateUrl: './domaca-stran.component.html',
  styleUrls: ['./domaca-stran.component.css']
})
export class DomacaStranComponent implements OnInit {

  constructor(private title: Title) {
    title.setTitle("Stockbotics");
  }

  ngOnInit() {
  }

}
