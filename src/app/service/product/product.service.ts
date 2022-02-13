import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Product} from '../../model/product';
import {catchError} from 'rxjs/operators';
import {ExceptionHandler} from '../../exception/exception.handler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  saveProduct(product: Product) {
    return this.http.post<Product>('http://localhost:8082/product/save', product).pipe(
      catchError(ExceptionHandler.handleError)
    );
  }

  getProducts() {
    return this.http.get<Product[]>('http://localhost:8082/product/all').pipe(
      catchError(ExceptionHandler.handleError)
    );
  }
}
