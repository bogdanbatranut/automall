import {Component, Input} from '@angular/core';
import {DetailedLogsComponent} from "../../scraping/logs/detailed-logs/detailed-logs.component";

@Component({
  selector: 'app-accordion-item-body',
  standalone: true,
  imports: [
    DetailedLogsComponent
  ],
  templateUrl: './accordion-item-body.component.html',
  styleUrl: './accordion-item-body.component.css'
})
export class AccordionItemBodyComponent {

  @Input() accordionId! : string
  @Input() panelId!: string
  @Input() sessionID! : number

}
