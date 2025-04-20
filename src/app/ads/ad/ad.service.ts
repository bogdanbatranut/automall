import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AdModel} from "../ads-list/ads.model";

@Injectable({
  providedIn: 'root',
})
export class AdService {
  private host = "http://dev.auto-mall.ro:8080";
  private baseUrl = 'http://'+this.host;

  constructor(private http: HttpClient) {}

  getAdById(id: number): Observable<AdModel> {
    return this.http.get<AdModel>(`${this.baseUrl}/ad/${id}`);
  }
}
