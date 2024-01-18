import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FilterComponent} from "./ads/filter/filter.component";
import {MainBarComponent} from "./main-bar/main-bar.component";
import {ToastComponent} from "./shared/toast/toast.component";
import {ToastsContainerComponent} from "./shared/toasts-container/toasts-container.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FilterComponent, MainBarComponent, ToastComponent, ToastsContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'automall';

}
