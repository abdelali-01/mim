export interface ProductItem  {
  product: string;
  quantity: number;
  price: number;
}


export interface NotebookItem {
  _id? : string ;
  products : ProductItem[];
  total : number ;
  prePayment : number ;
  date?: Date;
  paid: boolean;
  paidDate?: Date;
}

export interface Notebook {
  _id: string; // Mongoose adds _id to each document
  client: {
    id: string; // ObjectId as string
    username: string;
    phone: string
  };
  table: NotebookItem[];
  total: number;
  prePayment: number;
  createdAt: string; // from timestamps
  updatedAt: string; // from timestamps
}

