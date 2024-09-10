import { Product } from "../sheshine/services/product.service";
import { Address } from "./address.model";



// OrderProduct Model
export interface OrderProduct {
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string; // Optional field
}

// Order Model
export interface Order {
  id: number;
  products: Product[];
  address: Address;
  user: {
    id: number;
    email: string;
    name: string;
    phone: string;
  };
  amount: number;
  total: number;
  price: number;
  date: string; // ISO date string
  status: string;
}
export interface Order {

  orderStatus: string;
  orderAddress: Address;
  amount: number;
  product: Product;
  orderDate: string;
  deliveryDate: string;
  status: string;
}