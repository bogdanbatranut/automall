import { Routes } from '@angular/router';
import {AdsListComponent} from "./ads/ads-list/ads-list.component";

export const routes: Routes = [
  {path: 'ads-list/:id' , component : AdsListComponent}
];
