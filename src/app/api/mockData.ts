export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
  addedDate: string;
}

export interface StockLogRaw {
  productId: string;
  employeeId: string;
  type: string;
  quantityChange: number;
  comment?: string;
  timestamp: string;
  products: { name: string };
  employees: { name: string };
}

export let mockProducts: Product[] = [
  {
    id: '1',
    name: 'Vestido Floral',
    category: 'Vestidos',
    price: '899.99',
    stock: 24,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300',
    addedDate: '2026-01-10',
  },
  {
    id: '2',
    name: 'Camisa Lino',
    category: 'Camisas',
    price: '459.00',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300',
    addedDate: '2026-02-02',
  },
  {
    id: '3',
    name: 'Pantalón Palazzo',
    category: 'Pantalones',
    price: '650.50',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300',
    addedDate: '2026-02-14',
  },
  {
    id: '4',
    name: 'Chaqueta Denim',
    category: 'Chaquetas',
    price: '1099.00',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300',
    addedDate: '2026-03-01',
  },
  {
    id: '5',
    name: 'Falda Plisada',
    category: 'Faldas',
    price: '520.00',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=300',
    addedDate: '2026-03-20',
  },
];

export let mockStockLogs: StockLogRaw[] = [
  {
    productId: '1',
    employeeId: 'e1',
    type: 'addition',
    quantityChange: 20,
    comment: 'Reposición inicial',
    timestamp: '2026-01-10T09:00:00.000Z',
    products: { name: 'Vestido Floral' },
    employees: { name: 'Ana Torres' },
  },
  {
    productId: '2',
    employeeId: 'e2',
    type: 'subtraction',
    quantityChange: 5,
    comment: 'Venta en tienda',
    timestamp: '2026-02-05T14:30:00.000Z',
    products: { name: 'Camisa Lino' },
    employees: { name: 'Luis Ramos' },
  },
  {
    productId: '3',
    employeeId: 'e1',
    type: 'addition',
    quantityChange: 10,
    comment: 'Nuevo lote',
    timestamp: '2026-02-16T11:15:00.000Z',
    products: { name: 'Pantalón Palazzo' },
    employees: { name: 'Ana Torres' },
  },
  {
    productId: '4',
    employeeId: 'e3',
    type: 'subtraction',
    quantityChange: 2,
    comment: 'Devolución dañada',
    timestamp: '2026-03-02T16:45:00.000Z',
    products: { name: 'Chaqueta Denim' },
    employees: { name: 'María Gómez' },
  },
];

let nextProductId = mockProducts.length + 1;

export const generateProductId = () => String(nextProductId++);
