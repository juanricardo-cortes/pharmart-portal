export interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number
}

export interface OrderItem {
  item: Item,
  quantity: Number;
}
