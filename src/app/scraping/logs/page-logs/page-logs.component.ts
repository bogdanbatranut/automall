import {Component, OnInit} from '@angular/core';
import {ScrapeLogsService} from "../../../services/scrape-logs.service";
import {map} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Market, PageLog, SessionJob} from "../../../datamodels/logs-data-models";
import {NgClass, NgForOf} from "@angular/common";
import {CriteriaModel} from "../../../criterias/criterias.model";

@Component({
  selector: 'app-page-logs',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './page-logs.component.html',
  styleUrl: './page-logs.component.css'
})

export class PageLogsComponent implements OnInit{

  public criteriaLogId:number = 0
  public pageLogs : PageLog[] = []

  constructor(private logsService : ScrapeLogsService, private route : ActivatedRoute) {
    this.criteriaLogId = route.snapshot.params['criteriaLogId'];
  }

  ngOnInit(){
    if (this.criteriaLogId != 0){
      this.logsService.getPageLogsForCriteriaLog(this.criteriaLogId).pipe(
        map(response => {
          this.pageLogs = response
        })
      ).subscribe()
    }
  }

  goToLink(url : string) {
    window.open(url, "blank")
  }

  runPage(pageLog : PageLog) {
    let job : SessionJob = this.toSessionJob(pageLog,true)
    this.logsService.sendJobToMQ(job)
  }

  toSessionJob( pageLog : PageLog, allowPageIncrement : boolean): SessionJob {
    let market = new Market(pageLog.MarketName, 1)
    let criteria = new CriteriaModel(
      pageLog.CriteriaLog.CriteriaID,
      pageLog.Brand,
      pageLog.CarModel,
      2019,
      2024,
      0,
      125000,
      true,
      pageLog.CriteriaLog.Fuel
    )
    let job = new SessionJob(
      pageLog.SessionID,
      pageLog.JobID,
      pageLog.CriteriaLog.CriteriaID,
      pageLog.MarketID,
      criteria,
      market,
      allowPageIncrement
    )
    return job
  }
}
