import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AdModel} from "../ads-list/ads.model";

@Injectable({
  providedIn: 'root'
})
export class RecentAdsService {

  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.backendURL+":"+environment.backendPort
  }

  getRecentAds(age : number): Observable<AdModel[]> {
    return this.http.get<AdModel[]>(
      `${this.baseUrl}/recent`,
      {
        params: {
          age: age.toString()
        },
      },
    );
  }
}
