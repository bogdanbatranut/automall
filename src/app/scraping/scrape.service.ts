import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subscription, tap} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Respose, ScrapeStartResponse} from "./data.models";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})


export class ScrapeService {

  // domain = "http://127.0.0.1:8080"
  domain = "http://dev.auto-mall.ro:8080"
  baseURL = environment.backendURL

  constructor(private http : HttpClient) {
  }

  scrapeURL = "http://dev.auto-mall.ro:3223/start"
  // updateScrapeMarketsAndCriteriasURL = "http://dev.auto-mall.ro:8080/marketsAndCriterias"

  startScrape() : Observable<string> {
    let scrapeURL = this.baseURL + ":3223/start"
    return this.http.post<ScrapeStartResponse>(scrapeURL, "").pipe(
      map(val => {return val.Data})
    )
  }

  activateScrapeMarketsAndCriterias(form : any) : Observable<string> {

    // const headerss = { 'Content-Type': 'application/json'};
    let url = this.domain + "/marketsAndCriterias"
    let ff = JSON.stringify(form)
    return this.http.post<Respose>(url, ff).pipe(
        map(res => {return res.Data})
    )
  }

  saveSetupFormData(formData: any): Observable<any> {
    let apiUrl = this.baseURL+ ":8080" + "/setup/save"
    return this.http.post(`${apiUrl}`, formData);
  }
}
