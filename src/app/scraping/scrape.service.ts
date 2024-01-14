import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";

export interface ScrapeStartResponse {
  Data : string
}

@Injectable({
  providedIn: 'root'
})

export class ScrapeService {

  scrapeURL = "http://dev.auto-mall.ro:3223/start"

  constructor(private http : HttpClient) { }

  startScrape() : Observable<string> {
    return this.http.post<ScrapeStartResponse>(this.scrapeURL, "").pipe(
      map(val => {return val.Data})
    )
  }
}
