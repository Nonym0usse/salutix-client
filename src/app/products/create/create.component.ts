import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {Product} from "../../interfaces/product";
import {MatStepper} from "@angular/material/stepper";
// @ts-ignore
import Resizer from "react-image-file-resizer";

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Router} from "@angular/router";
import {AngularFireStorage, AngularFireStorageModule} from "@angular/fire/compat/storage";
import {SpinnerVisibilityService} from "ng-http-loader";
import {CoupangService} from "../../services/coupang.service";
// @ts-ignore

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class CreateComponent implements OnInit {
  // @ts-ignore
  firstFormGroup: FormGroup;
  // @ts-ignore
  secondFormGroup: FormGroup;
  products: Product | undefined;
  completed = false;
  public Editor = ClassicEditor;
  success: string | undefined;

  constructor(private _formBuilder: FormBuilder, private productService: ProductsService, private router: Router, private afStorage: AngularFireStorage, private spinner: SpinnerVisibilityService, private coupangService: CoupangService) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      asin: ['', Validators.required],
    });

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
  }

  scrapping(stepper: MatStepper){
    // @ts-ignore
    const asin = this.firstFormGroup.get('asin').value;
    // @ts-ignore
    this.productService.getProductsScrapping(asin).subscribe((data: Product) =>{
      this.products = data;
      // @ts-ignore
      this.secondFormGroup.setValue({
        title: this.products.title ?? null,
        description: this.products.description ?? null,
        price: this.products.price ?? null,
        naverprice: this.products.naverprice ?? null,
        coupangPrice: this.products.coupangPrice ?? null,
        inventory: this.products.inventory ?? null,
        weight: this.products.weight ?? null,
        dimensions: this.products.dimensions ?? null,
        keywords: this.products.keywords ?? null,
        brand: this.products.brand ?? null
      });
      this.completed = true;
      stepper.next();
    });
  }

  uploadFile(file: string, name: any) {
    return new Promise(
      (resolve, reject) => {
        fetch(file).then(res => {
          return res.blob();
        }).then(blob => {
            Resizer.imageFileResizer(
              blob,
              1000,
              1000,
              "JPEG",
              100,
              0,
              (uri: any) => {
                // @ts-ignore
                this.afStorage.ref().child(name + '.jpg').put(uri).then(() => resolve("https://storage.googleapis.com/salutix/"+ name +".jpg"))
                  .catch(function (err: any) {
                    console.error(err);
                  });
              },
              "blob",
              500,
              500,
            );
          }
        );
      });
  }


   async saveData() {
     const dataForm = this.secondFormGroup.value;
     dataForm.ASIN = this.products?.ASIN;
     dataForm.date = this.products?.date;
     dataForm.lastPurchasePrice = 0;
     dataForm.rank = 0;
     dataForm.image = await this.uploadFile(this.products?.image, this.products?.ASIN);
     dataForm.url = "https://amazon.fr/dp/" + this.products?.ASIN;
     this.coupangService.createProduct(dataForm).subscribe(() => this.router.navigate(['products/list']).catch((err) => console.log(err)))
   }
}
