import {Component, Input, OnInit} from '@angular/core';
import {CriteriasService} from "../../criterias/criterias.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, Observable, tap} from "rxjs";
import {AdModel, Price} from "./ads.model";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {AdComponent} from "../ad/ad.component";
import {AdsService} from "../ads.service";
import {FormGroup} from "@angular/forms";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [
    AsyncPipe,
    AdComponent,
    NgForOf,
    JsonPipe,
    NgIf,
  ],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css'
})
export class AdsListComponent implements OnInit{
  @Input() formData : FormGroup = new FormGroup<any>({})
  ads$ : Observable<AdModel[]>
  ads : AdModel[] = []
  criteriaId : number = 0

  isLoading : boolean = false
  test : string = "init val"


  constructor(
    private criteriasService : CriteriasService,
    private route: ActivatedRoute,
    private adsService : AdsService,
    private toastService : ToastService
  ) {
    this.ads$ = new Observable<AdModel[]>()
  }

  sortByDiscount(a : AdModel, b : AdModel){
    if (a.DiscountValue < b.DiscountValue){
      return 1
    }
    if (a.DiscountValue > b.DiscountValue){
      return -1
    }
    return 0
  }

  ngOnInit(): void {

    const self = this
    this.formData.valueChanges.subscribe(value => {
      self.ads = []
      self.isLoading = true;
      self.test = "loading..."
      this.adsService.getAds(value).subscribe(response => {
        self.isLoading = false;
        self.test = "done loading"
        if (response.Data != null ){
          response.Data.forEach(function (ad) {
            self.ads.push(
              new AdModel(
                ad.ID, ad.Brand, ad.CarModel, ad.Ad_url,
                ad.Prices.map(price => {
                  return new Price(price.ID, price.Price, (new Date(price.CreatedAt).toLocaleDateString("ro-RO")))
                }),
                ad.Market, ad.Year, ad.Km, ad.Age, ad.DiscountValue, ad.DiscountPercent, ad.Thumbnail
              )
            )
          })
        }else {
          this.toastService.showToast(true, "There are no cars for this criteria... please change criteria.")
        }
      })
    })

    // this.formData.valueChanges.subscribe(val => {
    //     this.isLoading = true
    //   this.test = "1"
    //     this.ads$ = this.adsService.getAds(val).pipe(
    //       map(response => {
    //         return response.Data;
    //       }),
    //
    //       map(ads => {
    //         return ads.map(ad => {
    //           this.isLoading = false;
    //           this.test = "2";
    //             return new AdModel(
    //               ad.ID, ad.Brand, ad.CarModel, ad.Ad_url,
    //               ad.Prices.map(price => {
    //                 return new Price(price.ID, price.Price, (new Date(price.CreatedAt).toLocaleDateString("ro-RO")))
    //               }),
    //               ad.Market, ad.Year, ad.Km, ad.Age, ad.DiscountValue, ad.DiscountPercent, ad.Thumbnail
    //             )
    //           }
    //         )
    //       }),
    //     )
    //
    //   }
    // );


  }

}
