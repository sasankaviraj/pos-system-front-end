import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {Product} from '../../model/product';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  product: Product;
  submitted = false;
  productList: Product[];
  btnTypeSave: boolean;
  productId: number;
  page = 1;
  pageSize = 5;
  constructor(private formBuilder: FormBuilder, private productService: ProductService) {}

  ngOnInit() {
    this.btnTypeSave = true;
    this.getProducts();
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required]],
      weight: ['', [Validators.required]],
    });
  }

  get formControl() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.product = new Product(this.productForm.value);
    this.saveProduct(this.product);
  }

  saveProduct(product: Product) {
    if (this.btnTypeSave) {
      this.productService.saveProduct(product).subscribe((response: Product) => {
        this.getProducts();
        this.reset();
        Swal.fire(
          'Product Saved Successfully!',
          'success'
        );
      });
    } else {
      this.productService.updateProduct(product, this.productId).subscribe((response: Product) => {
        this.getProducts();
        this.reset();
        Swal.fire(
          'Product Updated Successfully!',
          'success'
        );
      });
    }

  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.productList = response;
    });
  }

  removeProduct(id: number) {
    Swal.fire({
      title: 'Do you want to delete the product?',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe((response: any) => {
          this.reset();
          this.getProducts();
          Swal.fire(
            'Product Deleted Successfully!',
            'success',
            'success'
          );
        });
      }
    });

  }

  rowClicked(product: Product) {
    this.productForm.setValue({
      name: product.name,
      weight: product.weight,
      price: product.price
    });
    this.productId = product.id;
    this.btnTypeSave = false;
  }

  reset() {
    this.btnTypeSave = true;
    this.productId = null;
    this.submitted = false;
    this.productForm.reset();
  }

}
