import {Customer} from './customer';
import {Order} from './order';

export class SharedModel {
  customer: Customer;
  order: Order;

  public constructor(init?: Partial<SharedModel>) {
    Object.assign(this, init);
  }
}
