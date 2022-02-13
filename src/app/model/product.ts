export class Product{
  id:number;
  name:string;
  price:number;
  weight:number

  public constructor(init?: Partial<Product>) {
    Object.assign(this,init);
  }
}
