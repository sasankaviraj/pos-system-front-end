import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../util/constants';
import {catchError} from 'rxjs/operators';
import {ExceptionHandler} from '../../exception/exception.handler';
import {Customer} from '../../model/customer';

const URL = '/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  saveCustomer(customer: Customer) {
    return this.http.post<Customer>(Constants.BASE_URL + URL + '/save', customer).pipe(
      catchError(ExceptionHandler.handleError)
    );
  }

  updateCustomer(customer: Customer, id: number) {
    return this.http.post<Customer>(Constants.BASE_URL + URL + '/update/' + id, customer).pipe(
      catchError(ExceptionHandler.handleError)
    );
  }

  getCustomers() {
    return this.http.get<Customer[]>(Constants.BASE_URL + URL + '/all').pipe(
      catchError(ExceptionHandler.handleError)
    );
  }

  deleteCustomer(id: number) {
    return this.http.post<any>(Constants.BASE_URL + URL + '/delete/' + id, null).pipe(
      catchError(ExceptionHandler.handleError)
    );
  }
}
