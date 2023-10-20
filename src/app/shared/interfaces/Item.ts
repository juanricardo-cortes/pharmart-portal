export class Item {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public price: number,
    public image: string,
    public stock: number,
    public commission: number
  ) {}
}

export class OrderItem {
  constructor(
    public itemId: string,
    public quantity: number,
    public sellerName: string,
    public createdAt: Date
  ) {}
}

export class OrderTracker {
  constructor(
    public _id: string,
    public total: number,
    public orders: string[],
    public createdAt: Date
  ) {}
}
