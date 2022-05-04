import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../interfaces/product";
import {Router} from "@angular/router";
import {CoupangService} from "../../services/coupang.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  products: Product[] | undefined;
  error: string | undefined;
  constructor(private productService: ProductsService, private router: Router, private coupangService: CoupangService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((data: Product[]) =>{
      this.products = data;
    });
  }

  updateDelivery(){
    this.coupangService.syncDelivery().subscribe((data: Product[]) =>{
      this.products = data;
    });
  }

  modifyProduct(product: string){
    this.router.navigate(['/products/modify', product]);
  }

  deleteProduct(ASIN: string, coupangProductId: string ){
    this.productService.deleteProduct(ASIN, coupangProductId).subscribe((data) => console.log(data))
  }

  syncCoupangAllProducts(){
    this.coupangService.syncAllProducts().subscribe((data) => console.log(data))
  }

  syncCoupangAllPrice(){
    this.coupangService.syncAllPrice().subscribe((data) => console.log(data))
  }

  publishProducts(){
    this.coupangService.publishAllProducts().subscribe((data) => console.log(data))
  }
}
