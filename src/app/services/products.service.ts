import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, Subscription, tap, throwError} from 'rxjs';
import {Product} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseURL = `https://salutix.herokuapp.com/products`
  user: any;
  headers: any;

  constructor(private http: HttpClient) {

  }

  getProducts(): Observable<any> {
   const user = JSON.parse(localStorage.getItem('user')!);

   console.log(user)
    const headers = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + user.stsTokenManager.accessToken,
      });
    return this.http.get<Product>(`${this.baseURL}/list`, { headers: headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }
}
