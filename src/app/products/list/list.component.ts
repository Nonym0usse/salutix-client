import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../interfaces/product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  products: Product[] | undefined;
  error: string | undefined;
  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((data: Product[]) =>{
      this.products = data;
    });
  }

  modifyProduct(product: string){
    this.router.navigate(['/products/modify/', {id: product}]);
  }

  deleteProduct(product: string){

  }
}
