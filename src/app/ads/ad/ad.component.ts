import {Component, Input} from '@angular/core';
import {AdModel, Market, Price} from "../ads-list/ads.model";
import {DecimalPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";

@Component({
  selector: 'app-ad',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    CanvasJSAngularChartsModule,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './ad.component.html',
  styleUrl: './ad.component.css'
})
export class AdComponent {
  @Input() ad : AdModel  = new AdModel(0, "", "", "", [new Price(0,0,"")], new Market(0, ""), 0, 0, 0)
  showChart : boolean = this.ad.Prices.length > 1

  chartOptions = {
    theme: "light2",
    animationEnabled: true,
    zoomEnabled: true,
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
    }]
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

  getBackGroundColor(){
    if (this.ad.DiscountValue > 0) {
      return "#E0FFFF"
    }
    if (this.ad.DiscountValue < 0) {
      return "#FFE4C4"
    }
      return "#FFFFFF"
  }
}
