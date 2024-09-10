export interface Order {
  id: string;
  date: Date;
  total: number;
  price: number;
  products: OrderProduct[];
}

export interface OrderProduct {
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string; // Optional field for a product image
}
