export interface Notebook {
  _id: string; // Mongoose adds _id to each document
  client: {
    id: string; // ObjectId as string
    username: string;
    phone: string
  };
  table: {
    _id : string ;
    product: string;
    quantity: number;
    price: number;
    date: string; // ISO string from backend, can convert to Date if needed
    paid: boolean;
    paidDate?: string; // Optional
  }[];
  total: number;
  prePayment: number;
  rest: number;
  createdAt: string; // from timestamps
  updatedAt: string; // from timestamps
}