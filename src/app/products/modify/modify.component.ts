import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  products: Product[] | undefined;
  id: string | null | undefined;
  constructor(private router: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
  }

  getSingleProduct(){
    this.productsService.getSingleProduct(this.id).subscribe((data: Product[]) =>{
      this.products = data;
    });
  }
}
