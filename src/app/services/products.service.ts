import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, Subscription, tap, throwError} from 'rxjs';
import {Product} from "../interfaces/product";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseURL = 'http://localhost:3000/products';
  productsRef = this.afFirestore.collection('products');

  user: any;
  headers: any;

  constructor(private http: HttpClient, private afFirestore: AngularFirestore) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.headers = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + user.stsTokenManager.accessToken,
      });
  }

  getProducts(): Observable<any> {
    return this.http.get<Product>(`${this.baseURL}/list`, { headers: this.headers });
  }

  getAllProducts(){
    return this.productsRef.snapshotChanges();
  }
}
