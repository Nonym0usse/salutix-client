import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, Subscription, tap, throwError} from 'rxjs';
import {Product} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseURL = 'http://salutix.herokuapp.com/products';
  user: any;
  headers: any;

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.headers = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + user.stsTokenManager.accessToken,
      });
  }

  getProducts(): Observable<any> {
    return this.http.get<Product>(`${this.baseURL}/list`, { headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  getProductsScrapping(asin: string, vat: string): Observable<any> {
    return this.http.get<Product>(this.baseURL + '/scrapping/' + asin + '/' + vat, { headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  deleteProduct(id: string): Observable<any> {
    console.log(id);
    return this.http.delete<Product>(this.baseURL + '/delete/' + id, { headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  getSingleProduct(id: string | null | undefined): Observable<any> {
    return this.http.get<Product>(this.baseURL + '/list/' + id, { headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  saveProduct(data: Product): Observable<any> {
    return this.http.post<Product>(this.baseURL + '/add-product', data,{ headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  saveProductCoupang(): Observable<any> {
    return this.http.post<Product>(this.baseURL + '/coupang/add-product', { headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  updateProduct(data: Product): Observable<any> {
    return this.http.patch<Product>(this.baseURL + '/modify' , data, { headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }
}
