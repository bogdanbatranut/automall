import {Component, OnInit} from '@angular/core';
import {AdModel} from "../ads/ads-list/ads.model";
import {ActivatedRoute} from "@angular/router";
import {AdService} from "../ads/ad/ad.service";
import {AdComponent} from "../ads/ad/ad.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-ad-container',
  standalone: true,
  imports: [
    AdComponent,
    NgIf
  ],
  templateUrl: './ad-container.component.html',
  styleUrl: './ad-container.component.css'
})
export class AdContainerComponent implements OnInit{
  ad: AdModel | null = null;

  constructor(private route: ActivatedRoute, private adService: AdService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.adService.getAdById(id).subscribe((data) => {
        this.ad = data;
      });
    }
  }
}
