import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CriteriasService} from "./criterias/criterias.service";
import {CriteriaModel} from "./criterias/criterias.model";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'automall';

  criterias : Observable<CriteriaModel[]>

  constructor(private criteriasService : CriteriasService) {
    this.criterias = this.criteriasService.getCriterias()
  }

}
