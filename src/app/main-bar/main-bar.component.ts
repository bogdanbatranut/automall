import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './main-bar.component.html',
  styleUrl: './main-bar.component.css'
})
export class MainBarComponent {

}
