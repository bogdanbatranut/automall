import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {CriteriaModel} from "./criterias.model";
import {AdModel, AdModelResponse} from "../ads/ads-list/ads.model";
import {environment} from "../../environments/environment.development";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CriteriasService {

  // criteriasURL = "http://127.0.0.1:8080/criterias"
  // adsURL = "http://127.0.0.1:8080/adsforcriteria"
  criteriasURL = ""
  adsURL = ""

  constructor(private http : HttpClient) {
    this.criteriasURL = environment.backendURL+":"+environment.backendPort+"/criterias"
    this.adsURL = environment.backendURL+":"+environment.backendPort+"/adsforcriteria"
  }

  getCriterias(){
    return this.http.get<CriteriaModel[]>(this.criteriasURL)
  }

  getAdsForCriteriaId(id : number) : Observable<AdModelResponse>{
    return this.http.get<AdModelResponse>(this.adsURL + "/" + id).pipe(
    )
  }
}
