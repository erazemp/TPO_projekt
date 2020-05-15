import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TeachingLavbicPodatkiService {

  private apiUrl = 'https://teaching.lavbic.net/api';

  constructor(private http: HttpClient) { }

  public pridobiDelnice(): Promise<any> {
      const url = `${this.apiUrl}/finance/delnice/seznam`;
      return this.http
        .get(url)
        .toPromise()
        .then(odgovor => odgovor);
  }
}
