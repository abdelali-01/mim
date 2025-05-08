export const tableData: import("./types").Notebook[] = [
  {
    _id: "1",
    client: {
      username: "Lindsey Curtis",
      phone: "0655878447",
      id: "user-id-1",
    },
    table: [
      {
        _id: "just123",
        products: [
          {
            product: "Banner",
            quantity: 1,
            price: 3900,
          },
          {
            product: "Trofie",
            quantity: 2,
            price: 4000,
          }
        ],
        total: 7900,
        prePayment : 4000 ,
        date: new Date("2025-05-07T10:23:45.123Z"),
        paid: false,
      },
      {
        _id: "just1234",
        products: [
          {
            product: "trodat",
            quantity: 3,
            price: 1200,
          },
        ],
        total: 3600,
        prePayment : 0 ,
        date: new Date("2025-05-08T11:00:00.000Z"),
        paid: false,
      },
      {
        _id: "just12345",
        products: [
          {
            product: "trodat",
            quantity: 2,
            price: 1400,
          },
        ],
        total: 2800,
        prePayment : 2800 ,
        date: new Date("2025-05-09T14:15:30.000Z"),
        paidDate :new Date("2025-05-29T14:15:30.000Z") , 
        paid: true,
      },
    ],
    total: 14300,
    prePayment: 4000,
    rest: 10300,
    createdAt: new Date("2025-05-07T10:23:45.123Z"),
    updatedAt: new Date("2025-05-09T14:15:30.000Z"),
  },
  {
    _id: "2",
    client: {
      username: "Kaiya George",
      phone: "0655878447",
      id: "user-id-2",
    },
    table: [
      {
        _id: "just12346",
        products: [
          {
            product: "Flyer",
            quantity: 1,
            price: 24900,
          },
        ],
        total: 24900,
        prePayment : 0 ,
        date: new Date("2025-05-10T09:45:00.000Z"),
        paid: false,
      },
    ],
    total: 24900,
    prePayment: 0,
    rest: 24900,
    createdAt: new Date("2025-05-10T09:45:00.000Z"),
    updatedAt: new Date("2025-05-10T09:45:00.000Z"),
  },
  {
    _id: "3",
    client: {
      username: "Test bark",
      phone: "0655878447",
      id: "user-id-3",
    },
    table: [
      {
        _id: "just123467",
        products: [],
        total: 0,
        prePayment : 0 ,
        date: new Date("2025-05-10T09:45:00.000Z"),
        paid: false,
      },
    ],
    total: 0,
    prePayment: 0,
    rest: 0,
    createdAt: new Date("2025-05-10T09:45:00.000Z"),
    updatedAt: new Date("2025-05-10T09:45:00.000Z"),
  },
];
