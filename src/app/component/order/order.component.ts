import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../service/customer/customer.service';
import {ProductService} from '../../service/product/product.service';
import {Customer} from '../../model/customer';
import {Product} from '../../model/product';
import Swal from 'sweetalert2';
import {OrderDetail} from '../../model/orderdetail';
import {Order} from '../../model/order';
import {OrderService} from '../../service/order/order.service';
import {SharedModel} from '../../model/sharedmodel';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  customerList: Customer[];
  productList: Product[];
  orderDetailList: OrderDetail[];
  ordersList: SharedModel[] = [];
  order: Order;
  selectedProduct: string;
  selectedCustomer: string;
  selectedProductName: string;
  totalPrice = 0;
  page = 1;
  pageSize = 5;

  constructor(private customerService: CustomerService, private productService: ProductService, private orderService: OrderService) { }

  ngOnInit() {
    this.clear();
    this.getCustomers();
    this.getProducts();
    this.getAllOrders();
  }

  onSubmit() {
    const order = new Order();
    order.customerId = Number(this.selectedCustomer);
    order.orderDetailList = this.orderDetailList;
    if (this.orderDetailList.length === 0) {
      Swal.fire(
        'Nothing to save!',
        'Please add products to make an order',
        'error'
      );
    } else {
      this.saveOrder(order);
    }
  }

  clear() {
    this.orderDetailList = [];
    this.selectedProduct = 'Select Products';
    this.selectedCustomer = 'Select Customer';
  }

  saveOrder(order: Order) {
    this.orderService.saveOrder(order).subscribe((response) => {
      this.clear();
      this.getAllOrders();
      Swal.fire(
        'Order Saved Successfully!',
        'success'
      );
    });
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customerList = response;
    });
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

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.productList = response;
    });
  }

  removeFromOrderList(orderDetail: OrderDetail) {
    const index = this.orderDetailList.indexOf(orderDetail);
    if (index !== -1) {
      this.orderDetailList.splice(index, 1);
      this.getTotalPrice();
    }
  }

  rowClicked(orderDetail: OrderDetail) {
    this.productList.forEach((product) => {
      if(product.id === orderDetail.productId) {
        this.selectedProductName = product.name;
      }
    });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.orderDetailList.forEach((orderDetail) => {
     let total = 0;
     this.productList.forEach((product) => {
        if (product.id === orderDetail.productId) {
          total = product.price * orderDetail.quantity;
        }
      });
     this.totalPrice = this.totalPrice + total;
    });
  }

  selectProduct() {
    console.log(this.selectedCustomer);
    Swal.fire({
      title: 'Enter the quantity',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add to cart',
      showLoaderOnConfirm: true,
      preConfirm: (qty) => {
        const orderDetail = new OrderDetail();
        orderDetail.productId = Number(this.selectedProduct);
        orderDetail.quantity = qty;
        this.orderDetailList.push(orderDetail);
        this.getTotalPrice();
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

  deleteOrder(id: number) {
    Swal.fire({
      title: 'Do you want to delete the order?',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(id).subscribe((response: any) => {
          this.getAllOrders();
          Swal.fire(
            'Order Deleted Successfully!',
            'success',
            'success'
          );
        });
      }
    });
  }

  updateOrder(id: number) {
    Swal.fire({
      title: 'Do you want to complete the order?',
      showCancelButton: true,
      confirmButtonText: 'Yes, Complete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.updateOrder(id).subscribe((response: any) => {
          this.getAllOrders();
          Swal.fire(
            'Order Updated Successfully!',
            'success',
            'success'
          );
        });
      }
    });
  }

}
