import {Component, Input} from '@angular/core';
import {AdModel, Market, Price, Seller} from "../ads-list/ads.model";
import {DecimalPipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {AdService} from "./ad.service";

@Component({
  selector: 'app-ad',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    CanvasJSAngularChartsModule,
    NgIf,
    DecimalPipe,
    NgClass
  ],
  templateUrl: './ad.component.html',
  styleUrl: './ad.component.css'
})
export class AdComponent {
  @Input() ad : AdModel  = new AdModel(0,"", "", "", "", "", [new Price(0,0,"")], new Market(0, ""), 0, 0, 0, 0, 0, "", 0, new Seller(""),0, false)

  constructor(private adService: AdService) {
  }

  showChart : boolean = this.ad.Prices.length > 1

  chartOptions = {
    theme: "light2",
    animationEnabled: true,
    zoomEnabled: false,
    title: {
      text: "Price evolution"
    },
    axisY: {
      // labelFormatter: (e: any) => {
      //   var suffixes = ["", "K", "M", "B", "T"];
      //
      //   var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
      //   if(order > suffixes.length - 1)
      //     order = suffixes.length - 1;
      //
      //   var suffix = suffixes[order];
      //   return "$" + (e.value / Math.pow(1000, order)) + suffix;
      // }
    },
    data: [{
      type: "line",
      xValueFormatString: "DD-MM",
      yValueFormatString: "#,###.##",
      dataPoints  : [{}]
    }],
    options: {
      maintainAspectRatio: false,
    }
  }

  brandLogoFile() : string {
    return this.ad.Brand.toLowerCase() + ".png"
  }

  ngOnInit() {
    this.showChart = this.ad.Prices.length > 3
    let dataPoints : any[] = []

    let data : {
      type : string,
      xValueFormatString : string,
      yValueFormatString : string,
      dataPoints : any[]
    }

    this.ad.Prices.map(price => {
      let splitDate = price.CreatedAt.split(".")
      let dateOfPrice = new Date(Number(splitDate[2]), Number(splitDate[1]), Number(splitDate[0]))
      dataPoints.push({x : dateOfPrice, y : price.Price})

      // data.type = "line"
      // data.xValueFormatString = "DD-MM"
      // data.yValueFormatString = "#,###.##"
      // data.dataPoints = dataPoints

      this.chartOptions.data[0].dataPoints = dataPoints
      // this.chartOptions.data.push(data)
    })
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  toggleFollow(adId: number) {
    this.ad.Followed = !this.ad.Followed
    this.adService.setFollow(this.ad.ID, this.ad.Followed)
  }

  getBackGroundColor(){
    if (this.ad.DiscountValue > 0) {
      return "#E0FFFF"
    }
    if (this.ad.DiscountValue < 0) {
      return "#FFE4C4"
    }
      return "#FFFFFF"
  }

  getMarketImg(): string {
    if (this.ad.Market.Name == "autovit") {
      return "https://statics.autovit.ro/optimus-storage/a/autovitro/images/logo.svg"
    }
    if (this.ad.Market.Name == "mobile.de") {
      return "https://seeklogo.com/images/M/mobilede-logo-C7AD259F8A-seeklogo.com.png"
    }
    if (this.ad.Market.Name == "autoscout") {
      return "https://www.autoscout24.com/assets/as24-header-footer/as24-horizontal-inverse.d34ff335.svg"
    }
    if (this.ad.Market.Name == "tiriacauto") {
      return "https://www.tiriacauto.ro/images/tiriac-auto-logo.jpg"
    }



    return ""
  }


  isDeleted(ad: AdModel): boolean {
    return ad.DeletedAt !== null && ad.DeletedAt !== ""
  }

  getLocaleDate(date: string): string {
    if (date == null || date == "") {
      return ""
    }
    return new Date(date).toLocaleDateString("ro-RO")
  }
}
