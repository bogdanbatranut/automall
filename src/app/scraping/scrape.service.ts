import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subscription, tap} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Respose, ScrapeStartResponse} from "./data.models";

@Injectable({
  providedIn: 'root'
})


export class ScrapeService {

  // domain = "http://localhost:8080"
  domain = "http://dev.auto-mall.ro:8080"

  constructor(private http : HttpClient) { }

  scrapeURL = "http://dev.auto-mall.ro:3223/start"
  // updateScrapeMarketsAndCriteriasURL = "http://dev.auto-mall.ro:8080/marketsAndCriterias"

  startScrape() : Observable<string> {
    return this.http.post<ScrapeStartResponse>(this.scrapeURL, "").pipe(
      map(val => {return val.Data})
    )
  }

  activateScrapeMarketsAndCriterias(form : any) : Observable<string> {

    let url = this.domain + "/marketsAndCriterias"

    return this.http.post<Respose>(url, form).pipe(
        map(res => {return res.Data})
    )
  }
}
