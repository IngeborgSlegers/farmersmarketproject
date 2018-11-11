import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';
import { Market } from '../market';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  markets: Market[];

  constructor(private marketService: MarketService) { }

  ngOnInit() {
    this.getMarkets()
  }

  getMarkets(): void {
    this.marketService.getMarkets().subscribe(markets => {this.markets = markets
      console.log(this.markets);
    });
  }
}
