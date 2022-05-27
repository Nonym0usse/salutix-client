import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, Subscription, tap, throwError} from 'rxjs';
import {Product} from "../interfaces/product";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseURL = 'https://salutixapi.com/products';

  productsRef = this.afFirestore.collection('products');

  user: any;
  headers: any;

  constructor(private http: HttpClient, private afFirestore: AngularFirestore, private afFS: AngularFireStorage) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.headers = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + user.stsTokenManager.accessToken,
      });
  }

  deleteProduct(id: string, url: string, sellerProductId: string){
    this.afFS.refFromURL(url).delete()
    return this.productsRef.doc(id).delete()
  }

  modifyProduct(data: Product): Promise<void> {
    return this.productsRef.doc(data.ASIN).update(data).then(() => {
      this.http.patch<Product>(this.baseURL + '/modify' , data, { headers: this.headers });
    });
  }

  getProductsScrapping(asin: string): Observable<any> {
    return this.http.get<Product>(this.baseURL + '/scrapping/' + asin);
  }

  getSingleProduct(product: string){
    return this.productsRef.doc(product).valueChanges();
  }

  getAllProducts(){
    return this.productsRef.snapshotChanges();
  }
}
