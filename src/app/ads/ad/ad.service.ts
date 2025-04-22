import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AdModel} from "../ads-list/ads.model";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class AdService {
  private host = "dev.auto-mall.ro:8080";
  private baseUrl = 'http://'+this.host;

  constructor(private http: HttpClient) {
    // this.baseUrl = environment.backendURL + ":" + environment.backendPort + "/ads";
    this.baseUrl = environment.backendURL+":"+environment.backendPort
  }

  getAdById(id: number): Observable<AdModel> {
    return this.http.get<AdModel>(`${this.baseUrl}/ad/${id}`);
  }
}
