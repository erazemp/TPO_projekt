import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Uporabnik } from '../razredi/uporabnik';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StreznikPodatkiService {

  private apiUrl = environment.apiUrl;

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

  public pridobiUporabnika(id: string): Promise<Uporabnik>{
    const url: string = `${this.apiUrl}/uporabniki/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Uporabnik)
      .catch(this.obdelajNapako);
  }


  public posodobiProfil(idUporabnika: string, podatkiObrazca: any): Promise<any> {
    const url: string = `${this.apiUrl}/uporabniki/${idUporabnika}`;
    console.log(podatkiObrazca);
    return this.http
      .put(url, podatkiObrazca)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }

  public vrniVseUporabnike(): Promise<any> {
    const url: string = `${this.apiUrl}/uporabniki`;
    return this.http
      .get(url)
      .toPromise();
  }
}
