export interface Order {
  id: string;
  date: string;
  total: number;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}