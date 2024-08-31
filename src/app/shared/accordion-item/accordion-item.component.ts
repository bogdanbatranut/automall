import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccordionHeaderComponent} from "../accordion-header/accordion-header.component";
import {AccordionItemBodyComponent} from "../accordion-item-body/accordion-item-body.component";
import {Session} from "../../datamodels/logs-data-models";

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [
    AccordionHeaderComponent,
    AccordionItemBodyComponent
  ],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css'
})
export class AccordionItemComponent {

  @Input() parentId! : string
  @Input() data! : any

  @Output() sessionDeleted = new EventEmitter<number>();

  getPanelId(): string {
    return "panel-"+this.data.ID
  }

  getTargetPanelID(): string {
    return "#panel-"+this.data.ID
  }

  getSessionID(): number {
    return this.data.ID
  }

  getMainPanelText() {
    let  cat = new Date(this.data.CreatedAt)
    return cat.toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' }) + " - " + this.data.SessionID
  }

  sessionDelete(sessionID: number ) {
    this.sessionDeleted.emit(sessionID)
  }

}
