import { Routes } from '@angular/router';
import {AdsListComponent} from "./ads/ads-list/ads-list.component";
import {LearnComponent} from "./learn/learn/learn.component";
import {AdsFilterComponent} from "./filter/ads-filter/ads-filter.component";
import {SetupComponent} from "./scraping/setup/setup.component";
import {LoginComponent} from "./public/login/login.component";
import {RegisterComponent} from "./public/register/register.component";

export const routes: Routes = [
  {path: 'ads-list/:id' , component : AdsListComponent},
  {path: 'learn' , component : LearnComponent},
  {path: 'adsfilter' , component : AdsFilterComponent},
  {path: 'scraping-setup', component : SetupComponent},
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent},
];
