import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {CoupangService} from "../../services/coupang.service";
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-coupang',
  templateUrl: './coupang.component.html',
  styleUrls: ['./coupang.component.css']
})
export class CoupangComponent implements OnInit {
  products: any;

  constructor(private CoupangService: CoupangService) { }

  ngOnInit(): void {
    this.CoupangService.getAllProducts().subscribe((products: any) =>{
     this.products = JSON.parse(products);
    });
  }

  syncCoupangAllProducts(){
    this.CoupangService.publishAllProducts().subscribe((data: any) =>{
      console.log(data);
    });
  }

  syncCoupangPrice(){
    console.log('ok az')
  }

}
