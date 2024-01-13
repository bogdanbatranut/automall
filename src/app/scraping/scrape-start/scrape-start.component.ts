import { Component } from '@angular/core';
import {ScrapeService} from "../scrape.service";

@Component({
  selector: 'app-scrape-start',
  standalone: true,
  imports: [],
  templateUrl: './scrape-start.component.html',
  styleUrl: './scrape-start.component.css'
})
export class ScrapeStartComponent {

  showToast : boolean = false
  toastMessage : string = ""

  constructor(private sservice : ScrapeService) {
  }

  startScraping() {
    this.sservice.startScrape().pipe().subscribe(res => this.showToast(res) )

  }

  closeToast(){
    this.showToast = false
  }

  showToast(message : string) {
    this.toastMessage = message
    this.showToast = true
  }

}
