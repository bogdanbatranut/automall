import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ScrapeLogsService} from "../../services/scrape-logs.service";
import {Session} from "../../datamodels/logs-data-models";

@Component({
  selector: 'app-accordion-header',
  standalone: true,
  imports: [],
  templateUrl: './accordion-header.component.html',
  styleUrl: './accordion-header.component.css'
})

export class AccordionHeaderComponent {

  @Input() targetId! : string
  @Input() text! : string
  @Input() session! : Session

  @Output() sessionDelete = new EventEmitter<number>();

  constructor(private logService : ScrapeLogsService) {
  }

  deleteSession(sessionId : number) {
    this.sessionDelete.emit(sessionId)
    this.logService.deleteSession(sessionId)

  }

  testPOST(sessionId : number) {
    // this.logService.testPOST(sessionId)
    this.logService.testPOST(sessionId)
  }

}
