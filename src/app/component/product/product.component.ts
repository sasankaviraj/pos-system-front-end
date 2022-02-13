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
  constructor(private formBuilder: FormBuilder, private productService: ProductService) {}

  ngOnInit() {
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
    this.productService.saveProduct(product).subscribe((response: Product) => {
      console.log(response);
      this.getProducts();
      Swal.fire(
        'Product Saved Successfully!',
        'success'
      );
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe((response: Product[]) => {
      this.productList = response;
      console.log(this.productList);
    });
  }

  removeProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((response: any) => {
      this.getProducts();
      Swal.fire(
        'Product Deleted Successfully!',
        'success'
      );
    });
  }

}
