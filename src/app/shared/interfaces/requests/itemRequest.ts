export interface AddItemRequest {
  name: string;
  description: string;
  price: number;
  image: File;
  quantity: number
}

export interface UpdateItemRequest {
  id: string;
  description: string;
  price: number;
  quantity: number;
}
