import { Injectable } from '@angular/core';
import {of, tap} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Product} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private afs: AngularFirestore) { }
  products = [];

  fetchProduct() {
    if (this.products && this.products.length) {
      return of(this.products)
    } else {
      return this.afs.collection('products', ref => {
        return ref.orderBy('title').limit(5);
      }).valueChanges().pipe(
        // @ts-ignore
        tap((products: Product) => this.products = products)
      );
    }
  }
}
