import {Component, Input} from '@angular/core';
import {AdModel, Market} from "../ads-list/ads.model";
import {JsonPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-ad',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf
  ],
  templateUrl: './ad.component.html',
  styleUrl: './ad.component.css'
})
export class AdComponent {
  @Input() ad : AdModel  = new AdModel(0, "", "", "", null, new Market(0, ""), 0, 0)

  goToLink(url: string){
    window.open(url, "_blank");
  }
}
