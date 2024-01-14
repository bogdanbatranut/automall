import { Component } from '@angular/core';
import {ScrapeService} from "../scrape.service";
import {ReactiveFormsModule} from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-scrape-start',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './scrape-start.component.html',
  styleUrl: './scrape-start.component.css'
})
export class ScrapeStartComponent {

  constructor(private sservice : ScrapeService) {
  }

  startScraping() {
    this.sservice.startScrape().pipe().subscribe()
  }

}
