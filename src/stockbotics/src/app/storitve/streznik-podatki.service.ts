import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

}
