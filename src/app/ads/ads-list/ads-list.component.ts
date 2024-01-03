import {Component, Input, OnInit} from '@angular/core';
import {CriteriasService} from "../../criterias/criterias.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {AdModel, Price} from "./ads.model";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {AdComponent} from "../ad/ad.component";
import {AdsService} from "../ads.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [
    AsyncPipe,
    AdComponent,
    NgForOf,
    JsonPipe
  ],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css'
})
export class AdsListComponent implements OnInit{
  @Input() formData : FormGroup = new FormGroup<any>({})
  ads$ : Observable<AdModel[]>
  criteriaId : number = 0

  constructor(private criteriasService : CriteriasService, private route: ActivatedRoute, private adsService : AdsService) {
    this.ads$ = new Observable<AdModel[]>()

  }

  ngOnInit(): void {

    this.formData.valueChanges.subscribe(val =>
      {
        this.ads$ = this.adsService.getAds(val).pipe(
          map(res => {
            return res.Data.map(ad  => {
              return new AdModel(
                ad.ID, ad.Brand, ad.CarModel, ad.Ad_url,
                ad.Prices.map(price => {
                  return new Price(price.ID, price.Price, (new Date(price.CreatedAt).toLocaleDateString("ro-RO")))
                }),
                ad.Market, ad.Year, ad.Km, ad.Age
              )
            })
          })
        )

      }
    )


    // this.formData.valueChanges.subscribe(val =>
    //   {
    //     this.adsService.getAds(val).pipe(
    //
    //     ).subscribe(val => console.log(val))
    //
    //   }
    // )

    // this.route.params.subscribe(value => {
    //   this.criteriaId = value['id']
    // })

      // this.route.params.subscribe(value => {
      //   this.ads$ = this.criteriasService.getAdsForCriteriaId(value['id']).pipe(
      //     map(res => {
      //       return res.Data.map(ad => {return new AdModel(ad.ID, ad.Brand, ad.CarModel, ad.Ad_url,
      //         ad.Prices.map(price => { return new Price(price.ID, price.Price, (new Date(price.CreatedAt).toLocaleDateString("ro-RO")))
      //         }),ad.Market, ad.Year, ad.Km, ad.Age
      //         )
      //       })
      //     })
      //   )
      // })
    }

}
