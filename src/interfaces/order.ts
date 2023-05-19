import { enumOrderStatus } from "@configs";

export interface IOrderDetails {
  id: number;
  name: string;
  status: enumOrderStatus;
  total: number;
  note: string;
  shippingAddress: string;
  billingAddress: string;
  paymentDate: number;
  deliveryDate: number;
  orderProducts: OrderProduct[];
  customer: OrderCustomer;
  importer: OrderImporter;
  exporter: any;
  createdAt?: number;
}

export interface OrderProduct {
  id: number;
  quantity: number;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  desc: string;
  cost: number;
  quantity: number;
  image: string;
}

export interface OrderCustomer {
  id: number;
  phone: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  address: string;
  point: number;
  cashback: number;
  rate: number;
  taxCode: string;
  email: string;
  image: string;
}

export interface OrderImporter {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  forgotPasswordOtp: any;
  isForgotPassword: boolean;
  role: string;
  status: number;
}
