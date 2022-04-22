import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Product} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class CoupangService {

  private baseURL = 'http://localhost:3000/coupang';
  user: any;
  headers: any;

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.headers = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + user.stsTokenManager.accessToken,
      });
  }

  publishAllProducts(): Observable<any> {
    return this.http.get<Product>(`${this.baseURL}/publish-all`, { headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  getAllProducts(): Observable<any> {
    return this.http.get<Product>(`${this.baseURL}/products-in-shop`, { headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }
}
