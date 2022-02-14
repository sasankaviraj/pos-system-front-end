import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../util/constants';
import {catchError} from 'rxjs/operators';
import {ExceptionHandler} from '../../exception/exception.handler';
import {Order} from '../../model/order';
import {SharedModel} from '../../model/sharedmodel';

const URL = '/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  saveOrder(order: Order) {
    return this.http.post<Order>(Constants.BASE_URL + URL + '/save', order).pipe(
      catchError(ExceptionHandler.handleError)
    );
  }

  getOrders() {
    return this.http.get<any>(Constants.BASE_URL + URL + '/all').pipe(
      catchError(ExceptionHandler.handleError)
    );
  }

  deleteOrder(id: number) {
    return this.http.post<any>(Constants.BASE_URL + URL + '/delete/' + id, null).pipe(
      catchError(ExceptionHandler.handleError)
    );
  }

  updateOrder(id: number) {
    return this.http.post<any>(Constants.BASE_URL + URL + '/update/' + id, null).pipe(
      catchError(ExceptionHandler.handleError)
    );
  }
}
