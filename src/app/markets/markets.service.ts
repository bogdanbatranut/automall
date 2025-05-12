import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MarketSetup, MarketSetupResponse, MarketsModelResponse} from "./markets.models";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MarketsService {
  marketsURL = ""
  marketsWithCriteriasURL = ""
  constructor(private http : HttpClient) {
    this.marketsURL = environment.backendURL+":"+environment.backendPort+"/markets"
    this.marketsWithCriteriasURL = environment.backendURL+":"+environment.backendPort+"/marketswithcriterias"

    // this.marketsURL = "http://dev.auto-mall.ro"+":"+environment.backendPort+"/markets"
  }

  getMarkets(){
    return this.http.get<MarketsModelResponse>(this.marketsURL).pipe(
      map(value => {return value.Data})
    )
  }

  getMarketsWithCriterias() : Observable<MarketSetup[]>{
    return this.http.get<MarketSetupResponse>(this.marketsWithCriteriasURL).pipe(
      map(value => {return value.Data})
    )
  }
}
