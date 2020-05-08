import { Inject, Injectable } from '@angular/core';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';
import { Uporabnik } from '../razredi/uporabnik';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import { StreznikPodatkiService } from './streznik-podatki.service';

@Injectable({
  providedIn: 'root'
})

export class AvtentikacijaService {

  constructor(
    @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage,
    private streznikPodatkiStoritev: StreznikPodatkiService
  ) { }

  public async registracija(uporabnik: any): Promise<any> {
    // console.log(uporabnik);
    return this.streznikPodatkiStoritev
      .registracija(uporabnik)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["žeton"]);
      });
  }

  public shraniZeton(zeton: string): void {
    this.shramba.setItem('sportyeet-zeton', zeton);
  }


}
