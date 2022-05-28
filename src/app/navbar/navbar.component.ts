import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {SearchService} from "../services/search.service";
import {debounceTime, map, Observable, of} from "rxjs";
import {Product} from "../interfaces/product";
import {CoupangService} from "../services/coupang.service";
import {ProductsService} from "../services/products.service";

// @ts-ignore
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // @ts-ignore
  products = of([]);
  searchModel = '';
  constructor(private loginService: LoginService, private router: Router, private searchService: SearchService, private productsService: ProductsService) {
  }

  ngOnInit(): void {
  }

  filterProducts() {
    // @ts-ignore
    this.products = this.searchService.fetchProduct().pipe(
      // @ts-ignore
      debounceTime(300),
      map((data) => this.performFilter(data))
    )
  }

  syncCatalog(){
    this.productsService.syncCatalog().subscribe((data) => console.log(data))
  }

  syncCoupang(){
    //this.coupangService.syncAllProducts().subscribe((data) => console.log(data))
  }

  performFilter(products: any) {
    // @ts-ignore
    return (products.indexOf(products.title.toLowerCase()) > -1);
  }

  logout(){
    this.loginService.SignOut().then(() => {
      localStorage.removeItem('user')
      this.router.navigate(['login'], { skipLocationChange: true })
    }).catch((err) => console.log(err))
  }

  settings(){
    this.router.navigate(['settings'], { skipLocationChange: true })
  }

  verifyCoupangProduct(){
    //this.coupangService.verifyProducts().subscribe((data) => console.log(data))
  }
}
