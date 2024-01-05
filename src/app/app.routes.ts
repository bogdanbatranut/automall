import { Routes } from '@angular/router';
import {AdsListComponent} from "./ads/ads-list/ads-list.component";
import {LearnComponent} from "./learn/learn/learn.component";

export const routes: Routes = [
  {path: 'ads-list/:id' , component : AdsListComponent},
  {path: 'learn' , component : LearnComponent}
];
