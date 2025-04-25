import {Component, OnInit} from '@angular/core';
import {AccordionHeaderComponent} from "../../shared/accordion-header/accordion-header.component";
import {ScrapeLogsService} from "../../services/scrape-logs.service";
import {Session} from "../../datamodels/logs-data-models";
import {AsyncPipe, NgForOf} from "@angular/common";
import {AccordionItemComponent} from "../../shared/accordion-item/accordion-item.component";

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [
    AccordionHeaderComponent,
    NgForOf,
    AccordionItemComponent,
    AsyncPipe,

  ],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit{

  public sessions : Session[] = []
  public masterAccordionID : string = "accordionExample"

  constructor(private logsService : ScrapeLogsService) {
  }

  ngOnInit(){
    this.logsService.getSessions()
      // .pipe(
      //   res => this.sessions = res
      // )
      .subscribe(
      sessions => this.sessions = sessions
    )
  }

  deleteSession(sessionId : number) {
    let idx : number = -1
    this.sessions.forEach((session,index) => {
      if (session.ID == sessionId) {
        idx = index
      }
    })
    if (idx > -1) {
      this.sessions.splice(idx, 1);
    }

  }

}
