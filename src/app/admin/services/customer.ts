export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface Feedback {
  id: number;
  message: string;
  isApproved: boolean;
}
