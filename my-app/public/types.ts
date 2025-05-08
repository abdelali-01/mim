export interface Notebook {
  _id: string; // Mongoose adds _id to each document
  client: {
    id: string; // ObjectId as string
    username: string;
    phone: string
  };
  table: {
    _id : string ;
    products : {
      product: string;
      quantity: number;
      price: number;
    }[];
    total : number ;
    prePayment : number ;
    date: string;
    paid: boolean;
    paidDate?: string;
  }[];
  total: number;
  prePayment: number;
  rest: number;
  createdAt: string; // from timestamps
  updatedAt: string; // from timestamps
}