import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  success: any;
  error: string | undefined;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((e) =>{
      console.log(e);
    });
  }
}
