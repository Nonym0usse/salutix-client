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
    this.productService.getAllProducts().subscribe((data) =>{
      this.products = data.map(e => {
        // @ts-ignore
        return {id: e.payload.doc.id, ...e.payload.doc.data()
        } as Product;
      })
    });
  }

  updateDelivery(){
    /*this.coupangService.syncDelivery().subscribe((data: Product[]) =>{
      this.products = data;
    });*/
  }

  modifyProduct(product: string){
    this.router.navigate(['/products/modify', product]);
  }

  deleteProduct(ASIN: string, coupangProductId: string ){
   // this.productService.deleteProduct(ASIN, coupangProductId).subscribe((data) => console.log(data))
  }
}
