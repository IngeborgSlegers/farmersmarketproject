import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vendor } from '../vendor';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  token: string = localStorage.getItem("token");

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.token
    })
  };

  vendorUrl = "http://localhost:3000/vendor";

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getVendor(id: number): Observable<Vendor> {
    return this.http
      .get<Vendor>(`${this.vendorUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError<Vendor>("getVendor")));
  }

  updateVendor(id: number): Observable<Vendor> {
    return this.http
      .put<Vendor>(`${this.vendorUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError<Vendor>("updateVendor")))
  }

  deleteVendor(id: number): Observable<Vendor> {
    return this.http
      .delete<Vendor>(`${this.vendorUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError<Vendor>("deleteVendor")));
  }
}
