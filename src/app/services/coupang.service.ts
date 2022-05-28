import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Product} from "../interfaces/product";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CoupangService {

  private baseURL = 'http://localhost:3000/products';

  user: any;
  headers: any;
  productsRef = this.afFirestore.collection('products');

  constructor(private http: HttpClient, private afFirestore: AngularFirestore) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.headers = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + user.stsTokenManager.accessToken,
      });
  }


  syncAllProducts(): Observable<any> {
    return this.http.get<Product>(`${this.baseURL}/sync`, { headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }



  getOrders(): Observable<any> {
    return this.http.get(this.baseURL + '/orders');
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }
}
