import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../model/customer';
import Swal from 'sweetalert2';
import {CustomerService} from '../../service/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  customer: Customer;
  submitted = false;
  customerList: Customer[];
  btnTypeSave: boolean;
  customerId: number;
  page = 1;
  pageSize = 5;

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService) { }

  ngOnInit() {
    this.btnTypeSave = true;
    this.getCustomers();
    this.customerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z \-\']+')]],
      address: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
    });
  }

  get formControl() { return this.customerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    this.customer = new Customer(this.customerForm.value);
    this.saveCustomer(this.customer);
  }

  saveCustomer(customer: Customer) {
    if (this.btnTypeSave) {
      this.customerService.saveCustomer(customer).subscribe((response: Customer) => {
        this.getCustomers();
        this.reset();
        Swal.fire(
          'Customer Saved Successfully!',
          'success'
        );
      });
    } else {
      this.customerService.updateCustomer(customer, this.customerId).subscribe((response: Customer) => {
        this.getCustomers();
        this.reset();
        Swal.fire(
          'Customer Updated Successfully!',
          'success'
        );
      });
    }

  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customerList = response;
    });
  }

  removeCustomer(id: number) {
    Swal.fire({
      title: 'Do you want to delete the customer?',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(id).subscribe((response: any) => {
          this.reset();
          this.getCustomers();
          Swal.fire(
            'Customer Deleted Successfully!',
            'success',
            'success'
          );
        });
      }
    });

  }

  rowClicked(customer: Customer) {
    this.customerForm.setValue({
      name: customer.name,
      address: customer.address,
      contactNumber: customer.contactNumber
    });
    this.customerId = customer.id;
    this.btnTypeSave = false;
  }

  reset() {
    this.btnTypeSave = true;
    this.customerId = null;
    this.submitted = false;
    this.customerForm.reset();
  }

}
