// Define the table data using the interface
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
        _id : 'just123',
        product: "Banner",
        quantity: 1,
        price: 3900,
        date: new Date("2025-05-07T10:23:45.123Z").toISOString(),
        paid: false,
      },
      {
        _id : 'just1234',
        product: "trodat",
        quantity: 3,
        price: 1200,
        date: new Date("2025-05-07T10:23:45.123Z").toISOString(),
        paid: false,
      },
      {
        _id : 'just12345',
        product: "trodat",
        quantity: 2,
        price: 1400,
        date: new Date("2025-05-07T10:23:45.123Z").toISOString(),
        paid: true,
      },
    ],
    total: 3900,
    prePayment: 0,
    rest: 3900,
    createdAt: new Date("2025-05-07T10:23:45.123Z").toISOString(),
    updatedAt: new Date("2025-05-07T10:23:45.123Z").toISOString(),
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
        _id : 'just12345',
        product: "Flyer",
        quantity: 1,
        price: 24900,
        date: new Date("2025-05-07T10:23:45.123Z").toISOString(),
        paid: false,
      },
    ],
    total: 24900,
    prePayment: 0,
    rest: 24900,
    createdAt: new Date("2025-05-07T10:23:45.123Z").toISOString(),
    updatedAt: new Date("2025-05-07T10:23:45.123Z").toISOString(),
  },
];