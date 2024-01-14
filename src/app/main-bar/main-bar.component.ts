import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ScrapeStartComponent} from "../scraping/scrape-start/scrape-start.component";

@Component({
  selector: 'app-main-bar',
  standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        ScrapeStartComponent,
    ],
  templateUrl: './main-bar.component.html',
  styleUrl: './main-bar.component.css'
})
export class MainBarComponent {

}
