import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-coupang',
  templateUrl: './coupang.component.html',
  styleUrls: ['./coupang.component.css']
})
export class CoupangComponent implements OnInit {

  constructor(private ProductService: ProductsService) { }

  ngOnInit(): void {
  }

}
