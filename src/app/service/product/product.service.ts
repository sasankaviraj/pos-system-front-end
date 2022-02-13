import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/product';
import {catchError} from 'rxjs/operators';
import {ExceptionHandler} from '../../exception/exception.handler';
import {Constants} from '../../util/constants';

const URL = '/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  saveProduct(product: Product) {
    return this.http.post<Product>(Constants.BASE_URL + URL + '/save', product).pipe(
      catchError(ExceptionHandler.handleError)
    );
  }

  getProducts() {
    return this.http.get<Product[]>(Constants.BASE_URL + URL + '/all').pipe(
      catchError(ExceptionHandler.handleError)
    );
  }

  deleteProduct(id: number) {
    return this.http.post<any>(Constants.BASE_URL + URL + '/delete/' + id, null).pipe(
      catchError(ExceptionHandler.handleError)
    );
  }
}
