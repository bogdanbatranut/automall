import {Component, OnInit} from '@angular/core';
import {CriteriasService} from "../../criterias/criterias.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {AdModel, Price} from "./ads.model";
import {AsyncPipe, NgForOf} from "@angular/common";
import {AdComponent} from "../ad/ad.component";

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [
    AsyncPipe,
    AdComponent,
    NgForOf
  ],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css'
})
export class AdsListComponent implements OnInit{

  ads$ : Observable<AdModel[]>

  constructor(private criteriasService : CriteriasService, private route: ActivatedRoute) {
    this.ads$ = new Observable<AdModel[]>()
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.ads$ = this.criteriasService.getAdsForCriteriaId(value['id']).pipe(
        map(res => {
          return res.Data.map(ad => {return new AdModel(ad.ID, ad.Brand, ad.CarModel, ad.Ad_url,
            ad.Prices.map(price => { return new Price(price.ID, price.Price, (new Date(price.CreatedAt).toLocaleDateString("ro-RO")))
            }),ad.Market, ad.Year, ad.Km
            )
          })
        })
      )
    })
  }


}
