import { Component } from '@angular/core';
import {AdsService} from "../ads.service";
import {AdComponent} from "../ad/ad.component";
import {NgForOf} from "@angular/common";
import {AdModel, Price} from "../ads-list/ads.model";

@Component({
  selector: 'app-folowed-ads',
  standalone: true,
  imports: [
    AdComponent,
    NgForOf
  ],
  templateUrl: './folowed-ads.component.html',
  styleUrl: './folowed-ads.component.css'
})
export class FolowedAdsComponent {

  public ads : any[] = []

  constructor(private adsService: AdsService) {

  }

  getAds() {
    this.adsService.getFollowedAds().subscribe((ads) => {
      ads.map(ad => {
        this.ads.push( new AdModel(
          ad.ID, ad.DeletedAt, ad.Title, ad.Brand, ad.CarModel, ad.Ad_url,
          ad.Prices.map(price => {
            return new Price(price.ID, price.Price, (new Date(price.CreatedAt).toLocaleDateString("ro-RO")))
          }),
          ad.Market, ad.Year, ad.Km, ad.Age, ad.DiscountValue, ad.DiscountPercent, ad.Thumbnail, ad.DailyDiscountAmmount, ad.Seller, ad.DealerAverageDiscount, ad.Followed
        )
        )
      })
    });
  }

  ngOnInit() {
    this.getAds()
  }

}
