import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Uporabnik } from '../razredi/uporabnik';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';

@Injectable({
  providedIn: 'root'
})
export class StreznikPodatkiService {

  private apiUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) {
  }

  public helloWorld(): Promise<any> {
    const url: string = `${this.apiUrl}/hello-world`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor);
  }

  public vrniNapovedi(): Promise<any> {
    const url: string = `${this.apiUrl}/napovedi`;
    return this.http
      .get(url)
      .toPromise()
      .then(napovedi => napovedi);
  }

  private obdelajNapako(err:any): Promise<any>{
    console.error('Prišlo je do napake', err);
    return Promise.reject(err.message || err);
  }

  public registracija(uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
    return this.avtentikacija('registracija', uporabnik);
  }

  private avtentikacija(urlNaslov: string, uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
    const url: string = `${this.apiUrl}/${urlNaslov}`;
    // console.log(uporabnik);
    return this.http
      .post(url, uporabnik)
      .toPromise()
      .then(rezultat => rezultat as RezultatAvtentikacije)
      .catch(this.obdelajNapako);
  }

  public prijava(uporabnik: any): Promise<RezultatAvtentikacije> {
    return this.avtentikacija('prijava', uporabnik);
  }
}
