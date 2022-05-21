import * as crypto from 'crypto-js';

export class Coupang{

  APIInfo(url: any, method: any, query?: any){

    const datetime = new Date().toISOString().substr(2,17).replace(/:/gi, '').replace(/-/gi, '') + "Z";
    const message = datetime + method + url + query;
    const urlpath = url + '?' + query;

    const ACCESS_KEY = '4627e0ea-8411-4b78-b248-65679669cebb';
    const SECRET_KEY = 'd1e31ee09bb1ed72695560b9f750f14c579835dd';

    const signature = crypto.HmacSHA256(message, SECRET_KEY).toString(CryptoJS.enc.Hex)

    const authorization = 'CEA algorithm=HmacSHA256, access-key=' + ACCESS_KEY + ', signed-date=' + datetime + ', signature=' + signature;

    return {
      hostname: 'api-gateway.coupang.com',
      port: 443,
      path: urlpath,
      method: method,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': authorization,
        'X-EXTENDED-TIMEOUT': 90000
      }
    };
  }

  calculatePrice(price: number, delivery: number){
    const euroToWons = price * 1420;
    const priceAndDelivery = (euroToWons + delivery) * 1.13;
    const margin = priceAndDelivery * 1.35;
    const rounded = Number((margin).toFixed(2));
    return Math.round(rounded/1000)*1000;
  }
}
