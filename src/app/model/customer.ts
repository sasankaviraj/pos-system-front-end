export class Customer {
  id: number;
  name: string;
  address: string;
  contactNumber: string;

  public constructor(init?: Partial<Customer>) {
    Object.assign(this, init);
  }
}
