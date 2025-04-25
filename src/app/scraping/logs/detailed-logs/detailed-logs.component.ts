import {Component, Input, OnInit} from '@angular/core';
import {ScrapeLogsService} from "../../../services/scrape-logs.service";
import {CriteriaLog, Market, MarketWithCriterias, Session, SessionJob} from "../../../datamodels/logs-data-models";
import {map} from "rxjs";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CriteriaModel} from "../../../criterias/criterias.model";

@Component({
  selector: 'app-detailed-logs',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    RouterModule,
    NgIf
  ],
  templateUrl: './detailed-logs.component.html',
  styleUrl: './detailed-logs.component.css'
})
export class DetailedLogsComponent implements OnInit{

  @Input() sessionID!: number
  public session! : Session
  public MarketsWithCriterias : MarketWithCriterias[] = []


  constructor(private logsService : ScrapeLogsService) {
  }

  ngOnInit(){
    if (this.sessionID != null){
      this.logsService.getSession(this.sessionID).pipe(
        map(response => {

          this.createMarketsWithCriterias(response)
        })
      ).subscribe()
    }

  }

  createMarketsWithCriterias(session : Session) {
    session.CriteriaLogs.forEach(criteriaLog => {
      let existingMarket = this.getMarketWithCriteria(criteriaLog.MarketID)
      if (existingMarket != null) {
        existingMarket.addCriteriaLog(criteriaLog)
        existingMarket.ResultsCount += criteriaLog.NumberOfAds
      }else{
        let newMarketWithCriteria = new MarketWithCriterias(criteriaLog.MarketID, criteriaLog.MarketName)
        newMarketWithCriteria.addCriteriaLog(criteriaLog)
        newMarketWithCriteria.ResultsCount += criteriaLog.NumberOfAds
        this.MarketsWithCriterias.push(newMarketWithCriteria)
      }
    })
    this.MarketsWithCriterias.forEach(mwc => {
      if (mwc.ResultsCount > 0) {
      }
    })
  }

  getMarketWithCriteria(marketId : number) {
    let res! : MarketWithCriterias
    this.MarketsWithCriterias.forEach(mwc => {
      if (mwc.ID == marketId) {
        res = mwc
      }
    })
    return res
  }

  getMarketPanelID(marketName : string) : string {
    return marketName
  }

  createMarketID(id : number) : string {
    return "session-" + this.sessionID + "-market-" + id
  }

  createDataBSTarget(text : string ) : string {
    return "#" + text
  }

  createTabPaneId(text : string) : string {
    return text + "-tab-pane"
  }

  getMarketBadgeClass(marketId : number ) : string {
    let classStr = "badge "
    let errLevel = this.getCriteriaErrorLevel(marketId)
    if (errLevel == -1) {
      classStr += "text-bg-danger"
    }

    if (errLevel == 0) {
      classStr += "text-bg-warning"
    }
    if (errLevel == 1) {
      classStr += "text-bg-success"
    }

    return classStr
  }

  getCriteriaErrorLevel(marketId : number) : number {
    let hasError = false
    let hasSuccess = false
    let marketWithCriteria = this.getMarketWithCriteria(marketId)
    marketWithCriteria.CriteriaLogs.forEach(criteria => {
      if (!criteria.Success) {
        hasError = true
      }else{
        hasSuccess = true
      }
    })

    if (hasError && hasSuccess) return 0
    if (hasError && !hasSuccess) return -1
    return 1
  }

  getCriteriaBadgeClass(criteria : CriteriaLog) {
    let classStr = "badge "
    let errLevel = this.getPageLogsErrorLevel(criteria)
    if (errLevel == -1) {
      classStr += "text-bg-danger"
    }

    if (errLevel == 0) {
      classStr += "text-bg-warning"
    }
    if (errLevel == 1) {
      classStr += "text-bg-success"
    }

    return classStr
  }

  getPageLogsErrorLevel(criteria : CriteriaLog) : number {
    let hasError  = false
    let hasSuccess = false
    criteria.PageLogs.forEach(pageLog => {
      // if (pageLog.Error != "") {
      if (!pageLog.Scraped || !pageLog.Consumed){
        hasError = true
      }else{
        hasSuccess = true
      }
    })
    if (hasError && hasSuccess) return 0
    if (hasError && !hasSuccess) return -1
    return 1
  }

  runCriteria(criteriaLog : CriteriaLog) {
    let job : SessionJob = this.toSessionJob(criteriaLog,true)
    this.logsService.sendJobToMQ(job)
  }

  toSessionJob( criteriaLog : CriteriaLog, allowPageIncrement : boolean): SessionJob {
    let market = new Market(criteriaLog.MarketName, 1)
    let criteria = new CriteriaModel(
      criteriaLog.CriteriaID,
      criteriaLog.Brand,
      criteriaLog.CarModel,
      2019,
      2024,
      0,
      125000,
      true,
      criteriaLog.Fuel
    )
    let job = new SessionJob(
      criteriaLog.SessionID,
      criteriaLog.JobID,
      criteriaLog.CriteriaID,
      criteriaLog.MarketID,
      criteria,
      market,
      allowPageIncrement
    )
    return job
  }

  getStartTime(criteriaLog : CriteriaLog) : string {
    let  cat = new Date(criteriaLog.CreatedAt)
    return cat.toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })
  }

  getEndTime(criteriaLog : CriteriaLog) : string {
    let  cat = new Date(criteriaLog.UpdatedAt)
    return cat.toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })
  }

  getDurationTime(criteriaLog : CriteriaLog) : string {
    let  start : Date = new Date(criteriaLog.CreatedAt)
    let  end : Date = new Date(criteriaLog.UpdatedAt)

    let diff = Math.round(start.getTime() / 1000 - end.getTime() / 1000)

    // let diffMs = (end.getTime() - start.getTime()); // milliseconds
    // let diffDays = Math.floor(diffMs / 86400000); // days
    // let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    // let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    //

    // console.log(diffDays + " days, " + diffHrs + " hours, " + diffMins + "minutes");

    return diff.toString()
  }

}

