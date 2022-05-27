import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {Product} from "../../interfaces/product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],

})
export class ModifyComponent implements OnInit {
  products: Product | undefined;
  id: string | null | undefined;
  // @ts-ignore
  secondFormGroup: FormGroup;
  completed = false;
  public Editor = ClassicEditor;
  constructor(private router: ActivatedRoute,private _formBuilder: FormBuilder, private routerNav: Router, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    if(!this.id){
      this.routerNav.navigate(['/dashboard'])
    }
    this.secondFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      naverprice: ['', Validators.required],
      coupangPrice: ['', Validators.required],
      inventory: ['', Validators.required],
      weight: ['', Validators.required],
      dimensions: ['', Validators.required],
      keywords: ['', Validators.required],
      brand: ['', Validators.required],
    });
    // @ts-ignore
    this.productsService.getSingleProduct(this.id).subscribe((data: Product) =>{
      this.products = data;
      this.secondFormGroup.setValue({
        title: this.products!.title ?? null,
        description: this.products!.description ?? null,
        price: this.products!.price ?? null,
        naverprice: this.products!.naverprice ?? null,
        coupangPrice: this.products!.coupangPrice ?? null,
        inventory: this.products!.inventory ?? null,
        weight: this.products!.weight ?? null,
        dimensions: this.products!.dimensions ?? null,
        keywords: this.products!.keywords ?? null,
        brand: this.products!.brand ?? null
      });
    });
  }

  saveData(){
    const dataForm = this.secondFormGroup.value;
    dataForm.ASIN = this.products?.ASIN;
    dataForm.date = this.products?.date;
    dataForm.lastPurchasePrice = 0;
    dataForm.rank = 0;
    dataForm.image = this.products?.image;
    dataForm.url = "https://amazon.fr/dp/" + this.products?.ASIN;
    this.productsService.modifyProduct(dataForm).then(() => {
      this.routerNav.navigate(['products/list'])
    });
  }
}
