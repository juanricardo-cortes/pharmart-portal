export class Item {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public price: number,
    public image: string,
    public stock: number
  ) {}
}

export class OrderItem {
  constructor(public item: Item, public quantity: number) {}
}
