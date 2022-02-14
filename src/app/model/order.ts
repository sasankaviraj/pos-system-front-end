import {OrderDetail} from './orderdetail';

export class Order {
  orderId: number;
  customerId: number;
  orderDetailList: OrderDetail[];
  completed: boolean;
  dateTime: string;

  public constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}
