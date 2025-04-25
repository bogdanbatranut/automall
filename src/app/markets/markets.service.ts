import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MarketsModelResponse} from "./markets.models";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MarketsService {
  marketsURL = ""
  constructor(private http : HttpClient) {
    this.marketsURL = environment.backendURL+":"+environment.backendPort+"/markets"
    // this.marketsURL = "http://dev.auto-mall.ro"+":"+environment.backendPort+"/markets"
  }

  getMarkets(){
    return this.http.get<MarketsModelResponse>(this.marketsURL).pipe(
      map(value => {return value.Data})
    )
  }
}
