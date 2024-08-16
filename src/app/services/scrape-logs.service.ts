import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CriteriaLog, Market, PageLog, Session, SessionJob} from "../datamodels/logs-data-models";
import {PageLogsComponent} from "../scraping/logs/page-logs/page-logs.component";
import {CriteriaModel} from "../criterias/criterias.model";

@Injectable({
  providedIn: 'root'
})
export class ScrapeLogsService {

  baseURL : string = "dev.auto-mall.ro"
  devBaseURL : string = "127.0.0.1"
  logsPort : string = "8088"
  mqPort : string = "3113"
  logsBaseURL : string = "http://dev.auto-mall.ro:8088"
  mqBaseURL : string = "http://dev.auto-mall.ro:3113"

  constructor(private http:HttpClient) {
    // this.logsBaseURL = "http://" + this.devBaseURL + ":" + this.logsPort
    // this.mqBaseURL = "http://" + this.devBaseURL + ":" + this.mqPort
  }

  getSessions() : Observable<Session[]> {
    let url = this.logsBaseURL + "/sessions"
    return this.http.get<Session[]>(url);
  }

  getSession(id : number) : Observable<Session> {
    let url = this.logsBaseURL + "/session/" + id
    return this.http.get<Session>(url);

  }

  getPageLogsForCriteriaLog(id : number) : Observable<PageLog[]> {
    let url = this.logsBaseURL + "/pagelogsforcriterialog/" + id
    return this.http.get<PageLog[]>(url);
  }

  sendJobToMQ(job: SessionJob) {
    let url = this.mqBaseURL + "/push/jobs"
    let body = JSON.stringify(job)
    this.http.post<any>(url,body).subscribe()
  }

  deleteSession(id : number) : void {

    let url = this.logsBaseURL + "/session/" + id
    this.http.delete(url).subscribe()
  }


}
