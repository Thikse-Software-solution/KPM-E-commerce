export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
    avatarUrl?: string;
  orderHistory?: Order[];  // Optional field for user profile picture
}
export interface Order {
  orderId: number;
  product: string;
  date: string;
  amount: number;
}

