import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {HttpClient} from "@angular/common/http";
import {Coupang} from "../shared/Coupang";
import * as https from "https";
import axios from "axios";


@Injectable({
  providedIn: 'root'
})
export class CoupangService {

  productsRef = this.afStore.collection('products');
  constructor(private afStore: AngularFirestore) {}
  createProduct(product: any){
    const coupangCredentials = new Coupang();
    return new Promise((resolve, reject) => {
      const strjson = JSON.stringify( {
        "sellerProductName": product.title,
        "vendorId": "C00615095",
        "saleStartedAt": "2022-01-01T23:59:59",
        "saleEndedAt": "2099-01-01T23:59:59",
        "displayProductName": product.title,
        "brand": product.brand,
        "deliveryMethod": "AGENT_BUY",
        "deliveryCompanyCode": "EPOST", //?
        "deliveryChargeType": "FREE",
        "deliveryCharge": 0,
        "freeShipOverAmount": 0,
        "deliveryChargeOnReturn": 30000,
        "remoteAreaDeliverable": "N",
        "unionDeliveryType": "NOT_UNION_DELIVERY",
        "returnCenterCode": "NO_RETURN_CENTERCODE",
        "returnChargeName": "ASK US",
        "companyContactNumber": "+330652415145",
        "returnZipCode": "135-090",
        "returnAddress": "ASK US",
        "returnAddressDetail": "333",
        "returnCharge": (product.coupangPrice > 100000) ? 70000 : (product.coupangPrice - 30000),
        "vendorUserId": "salutix",
        "requested": true,
        "items": [
          {
            "itemName": product.title,
            "originalPrice": product.coupangPrice * 1.05,
            "salePrice": product.coupangPrice,
            "maximumBuyCount": "100",
            "maximumBuyForPerson": "0",
            "outboundShippingTimeDay": "1",
            "maximumBuyForPersonPeriod": "1",
            "unitCount": 0,
            "adultOnly": "EVERYONE",
            "taxType": "FREE",
            "parallelImported": "NOT_PARALLEL_IMPORTED",
            "overseasPurchased": "OVERSEAS_PURCHASED",
            "pccNeeded": "true",
            "emptyBarcode": true,
            "emptyBarcodeReason": "상품확인불가_바코드없음사유",
            "searchTags": product.keywords.split(','),
            "images": [
              {
                "imageOrder": 0,
                "imageType": "REPRESENTATION",
                "vendorPath": product.image
              }
            ],
            "attributes": [
              {
                "attributeTypeName": "수량",
                "attributeValueName": "1개"
              },
            ],
            "contents": [
              {
                "contentsType": "TEXT",
                "contentDetails": [
                  {
                    "content": product.description,
                    "detailType": "TEXT"
                  },
                  {
                    "content": "https://storage.googleapis.com/salutix/notice.jpg",
                    "detailType": "IMAGE"
                  }
                ]
              }
            ],
          },
        ],
      });

      let body: any = [];
      // @ts-ignore
      axios.post(coupangCredentials.APIInfo('/v2/providers/seller_api/apis/api/v1/marketplace/seller-products', 'POST'), strjson)
        .then((data) => {
          body.push(data);
          body = Buffer.concat(body).toString();
          const json = JSON.parse(body);
          this.productsRef.doc(product.ASIN).set({coupangProductId: json.data}).then(() => resolve(json.message))
            .catch((err) => reject(err));
        }).catch((err) => {
          reject(err)

      })
    })
  }

  syncCatalog() {
    return new Promise(async (resolve, reject) => {
      const snapshot = await this.productsRef.get();
      await snapshot.forEach((doc) => {
        const coupangCredentials = new Coupang();
        let body: any = [];
        // @ts-ignore
        if (doc['data'].coupangProductId == null) {
          // @ts-ignore
          this.productsRef.doc(doc['data'].ASIN).delete();
        }
        // @ts-ignore
         axios.get(coupangCredentials.APIInfo('/v2/providers/seller_api/apis/api/v1/marketplace/seller-products/' + doc['data'].coupangProductId, 'GET'))
          .then((data) => {
            body.push(data);
            body = Buffer.concat(body).toString();
            const json = JSON.parse(body);
            json.data?.items?.forEach((coupangProduct: any) => {
              if (coupangProduct?.vendorItemId == null) {
                // @ts-ignore
                this.productsRef.doc(doc['data'].ASIN).delete();
              } else {
                // @ts-ignore
                axios.put(coupangCredentials.APIInfo('/v2/providers/seller_api/apis/api/v1/marketplace/vendor-items/' + coupangProduct?.vendorItemId + '/prices/' + doc['data'].coupangPrice, 'PUT'))
                  .then((data) =>{
                    resolve(data)
                  }).catch((err) => {
                    reject(err)
                  });
              }
            });
          })
      });
    });
  }
}
