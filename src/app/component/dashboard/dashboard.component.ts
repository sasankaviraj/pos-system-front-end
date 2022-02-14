import { Component, OnInit } from '@angular/core';
import {Customer} from '../../model/customer';
import {Product} from '../../model/product';
import {OrderDetail} from '../../model/orderdetail';
import {SharedModel} from '../../model/sharedmodel';
import {Order} from '../../model/order';
import {OrderService} from '../../service/order/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ordersList: SharedModel[] = [];
  page = 1;
  pageSize = 5;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.ordersList = [];
    this.orderService.getOrders().subscribe((response) => {
      response.forEach((all) => {
        all.forEach((details) => {
          this.ordersList.push(details);
        });
      });
    });
  }
}
