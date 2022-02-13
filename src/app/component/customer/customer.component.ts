import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup
  constructor() { }

  ngOnInit() {
    this.customerForm = new FormGroup({
      name: new FormControl(),
      address: new FormControl(),
      contactNo: new FormControl(),
    });
  }

}
