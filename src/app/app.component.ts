import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FilterComponent} from "./ads/filter/filter.component";
import {MainBarComponent} from "./main-bar/main-bar.component";
import {ToastComponent} from "./shared/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FilterComponent, MainBarComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'automall';

}
