import { Routes } from '@angular/router';
import {AdsListComponent} from "./ads/ads-list/ads-list.component";
import {LearnComponent} from "./learn/learn/learn.component";
import {AdsFilterComponent} from "./filter/ads-filter/ads-filter.component";
import {SetupComponent} from "./scraping/setup/setup.component";
import {LoginComponent} from "./public/login/login.component";
import {RegisterComponent} from "./public/register/register.component";
import {MarketsBrandsComponent} from "./scraping/markets-brands/markets-brands.component";
import {SupportedBrandsComponent} from "./scraping/supported-brands/supported-brands.component";
import {LogsComponent} from "./scraping/logs/logs.component";
import {PageLogsComponent} from "./scraping/logs/page-logs/page-logs.component";
import {AdContainerComponent} from "./ad-container/ad-container.component";

export const routes: Routes = [
  {path: 'ads-list/:id' , component : AdsListComponent},
  {path: 'learn' , component : LearnComponent},
  {path: 'adsfilter' , component : AdsFilterComponent},
  {path: 'scraping-setup', component : SetupComponent},
  {path: 'markets-brands', component : MarketsBrandsComponent},
  {path: 'scrape-logs', component : LogsComponent},
  {path: 'page-logs/:criteriaLogId', component : PageLogsComponent},
  {path: 'supported-brands', component : SupportedBrandsComponent},
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent},
  { path: 'ad/:id', component: AdContainerComponent },
];
