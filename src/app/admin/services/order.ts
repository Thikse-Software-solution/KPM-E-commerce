export interface Order {
    id?: number;
    customerName: string;
    productCode: string;
    quantity: number;
    totalAmount: number;
    status: string;
    orderDate: string; // Or use Date if you want to handle it as a date
  }
  