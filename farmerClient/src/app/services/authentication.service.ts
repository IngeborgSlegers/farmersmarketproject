import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vendor } from '../vendor'
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json"})
  };

  private authUrl = "http://localhost:30001/vendor";

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      if(error.status === 502) {
        alert("Username or password is incorrect!")
      } else if (error.status === 500) {
        alert("User email does not exist.")
      }
      return of(result as T);
    }
  }

  login(vendor: Vendor): Observable<any> {
    return this.http
      .post<Vendor>(`${this.authUrl}/login`, vendor, this.httpOptions)
      .pipe(catchError(this.handleError<Vendor>("login")));
  }

  signup(vendor: Vendor): Observable<any> {
    return this.http
      .post<Vendor>(`${this.authUrl}/signup`, vendor, this.httpOptions)
      .pipe(catchError(this.handleError<Vendor>("signup")));
  }
}
