import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ScrapeStarterServiceService {

  baseURL = environment.backendURL

  constructor(private http : HttpClient) {

  }

  startScraping(form : any) {
    let url = this.baseURL + ":3223/startMarketsAndCriterias";
    return this.http.post(url, form).subscribe(data => console.log(data));
    // this.starterService.startScrape().pipe().subscribe()
  }
}
