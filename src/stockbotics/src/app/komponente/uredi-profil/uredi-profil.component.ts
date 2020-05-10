import { Component, OnInit } from '@angular/core';
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Uporabnik} from "../../razredi/uporabnik";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-uredi-profil',
  templateUrl: './uredi-profil.component.html',
  styleUrls: ['./uredi-profil.component.css']
})
export class UrediProfilComponent implements OnInit {

  constructor(private streznikPodatkiService: StreznikPodatkiService, private pot: ActivatedRoute, private router: Router) { }

  public uporabnik: Uporabnik;
  public  submited = false;

  public editUporabnik = {
    uporabniskoIme: '',
    email: ''
  };

  public validacija(): boolean {
    // ce so podatki obrazca prazni
    if (this.editUporabnik.uporabniskoIme && this.editUporabnik.email) {
      return true;
    }
    this.submited = true;
    return false;
  }

//   if (this.validacija()) {
//   this.sportyeetPodatkiService.posodobiDogodek(this.dogodek._id, this.editDogodek)
// .then((dogodek: any) => {
//   console.log('Dogodek posodobljen', dogodek);
//   this.router.navigate(['/dogodek/' + this.dogodek._id]);
// }
// );
// }
//

  public urediProfil(){
    if (this.validacija()) {
      console.log("Uredi profil ts: "+ this.editUporabnik.uporabniskoIme);
      this.uporabnik.uporabniskoIme = this.editUporabnik.uporabniskoIme;
      this.uporabnik.email = this.editUporabnik.email;
      this.streznikPodatkiService.posodobiProfil(this.uporabnik._id, this.uporabnik)
        .then((uporabnik: any) => {
            console.log('Uporabnik posodobljen', uporabnik);
            this.router.navigate(['profil']);
          }
        );
    }
  }

  ngOnInit() {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('idUporabnika');
          console.log("OnInit uredi profil "+ id);
          return this.streznikPodatkiService.pridobiUporabnika(id);

        }))
      .subscribe((uporabnik: Uporabnik) => {
      this.uporabnik = uporabnik;
      console.log(uporabnik);
      this.editUporabnik.uporabniskoIme = this.uporabnik.uporabniskoIme;
      this.editUporabnik.email = this.uporabnik.email;
    });
  }

}
