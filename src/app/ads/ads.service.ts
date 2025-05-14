import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdModel, AdModelResponse} from "./ads-list/ads.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  adsURL = environment.backendURL
// adsURL = "http://127.0.0.1"

  constructor( private http : HttpClient
  ) { }

  getFollowedAds() : Observable<AdModel[]>{
    let url = this.adsURL + ":8080/folowed"
    return this.http.get<AdModel[]>(url)
  }

  getAds(form : any) : Observable<AdModelResponse>{
    let criteriaId = form.criteria.selected
    let params = new HttpParams();
    params = params.append("sortOption", form.sorting.sortOption)
    params = params.append("sortDirection", form.sorting.sortDirection);
    params = params.append("limitLow", form.priceLimits.minPrice.value)
    params = params.append("limitHigh", form.priceLimits.maxPrice.value)
    params = params.append("groupingOption", form.grouping.groupOption)
    params = params.append("limit", form.limit)
    params = params.append("page", form.page)

    let marketsList : number[] = [];
    let marketList : [{checked : boolean, id : number}] = form.marketsFilter.markets
    marketList.map(
      item => {
        if (item.checked) {
          marketsList.push(item.id)
        }
      }
    )

    let yearsList : number[] = [];
    let yearList : [{checked : boolean, id : number}] = form.yearsFilter.years
    yearList.map(
      item => {
        if (item.checked) {
          yearsList.push(item.id)
        }
      }
    )

    params = params.append("markets", marketsList.join(","))
    params = params.append("years", yearsList.join(","))
    let finalURL = this.adsURL + ":8080/adsforcriteriaPaginated/" + criteriaId
    return this.http.get<any>(finalURL, {params : params})
  }

}
