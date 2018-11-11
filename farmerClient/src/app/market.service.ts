import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Market } from './market';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient) { }

  private baseUrl = `http://localhost:3000/market`

  getMarkets(): Observable<any> {
    return this.http.get<Market[]>(this.baseUrl)
  }
}
