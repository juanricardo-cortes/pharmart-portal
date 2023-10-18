export interface AddItemRequest {
  name: string;
  description: string;
  price: number;
  image: File;
  stock: number;
  commission: number;
}

export interface UpdateItemRequest {
  id: string;
  description: string;
  price: number;
  stock: number;
  commission: number;
}
