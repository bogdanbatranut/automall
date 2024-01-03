import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdModelResponse} from "./ads-list/ads.model";

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  adsURL = "http://dev.auto-mall.ro"

  constructor( private http : HttpClient
  ) { }

  getAds(form : any) : Observable<AdModelResponse>{
    console.log("get ads -----", form)
    let criteriaId = form.criteriaId
    let params = new HttpParams();
    params = params.append("sortOption", form.sortOption)
    params = params.append("sortOptionDirection", form.sortOptionDirection);
    let marketsList : number[] = [];
    let marketList : [{checked : boolean, id : number}] = form.filters
    console.log("      ---- ", form.filters)

    marketList.map(
      item => {
        if (item.checked) {
          marketsList.push(item.id)
        }
      }
    )

    params = params.append("markets", marketsList.join(","))
    // let criteriaId = url.split("/")[2]
    let finalURL = this.adsURL + ":8080/adsforcriteria/" + criteriaId
    console.log("getting ads ....")
    return this.http.get<any>(finalURL, {params : params})

  }


  // getAds(form : FormGroup) : Observable<AdModelResponse>{
  //   console.log("get ads -----", form)
  //   let criteriaId = form.get('criteriaId')?.value
  //   let params = new HttpParams();
  //   params = params.append("sortOption", form.get("sortOption")?.value)
  //   params = params.append("sortOptionDirection", form.get("sortOptionDirection")?.value);
  //   let marketsList : number[] = [];
  //   let marketList = form.get('filters') as FormArray
  //
  //   marketList!.controls.map(
  //     item => {
  //       if (item.value.checked) {
  //         marketsList.push(item.value.id)
  //       }
  //     }
  //   )
  //
  //   params = params.append("markets", marketsList.join(","))
  //   // let criteriaId = url.split("/")[2]
  //   let finalURL = this.adsURL + ":8080/adsforcriteria/" + criteriaId
  //   console.log("getting ads ....")
  //   return this.http.get<any>(finalURL, {params : params})
  //
  // }
}
