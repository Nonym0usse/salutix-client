import { Component, OnInit } from '@angular/core';
import {CoupangService} from "../services/coupang.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private coupangService: CoupangService) { }

  ngOnInit(): void {
  }

  getOrders(){
    this.coupangService.getOrders();
  }
}
