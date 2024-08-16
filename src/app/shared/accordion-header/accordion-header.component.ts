import {Component, Input} from '@angular/core';
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

  constructor(private logService : ScrapeLogsService) {
  }

  deleteSession(sessionId : number) {
    this.logService.deleteSession(sessionId)
  }

}
