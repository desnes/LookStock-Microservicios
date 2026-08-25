// Datos quemados para permitir que el frontend funcione de forma independiente,
// sin necesidad de los microservicios de backend (uso como demo/portafolio).
import { mockProducts, generateProductId, Product } from './mockData';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// Obtener todos los productos
export const getAllProducts = async () => {
  await delay();
  return [...mockProducts];
};

// Obtener un producto por ID
export const getProductById = async (id: string) => {
  await delay();
  const product = mockProducts.find((p) => p.id === id);
  if (!product) throw new Error('Producto no encontrado');
  return product;
};

// Crear un producto
export const createProduct = async (productData: Omit<Product, 'id' | 'addedDate'>) => {
  await delay();
  const newProduct: Product = {
    ...productData,
    id: generateProductId(),
    addedDate: new Date().toISOString().split('T')[0],
  };
  mockProducts.push(newProduct);
  return newProduct;
};

// Actualizar un producto
export const updateProduct = async (id: string, updatedData: Partial<Product>) => {
  await delay();
  const index = mockProducts.findIndex((p) => p.id === id);
  if (index === -1) throw new Error('Producto no encontrado');
  mockProducts[index] = { ...mockProducts[index], ...updatedData };
  return mockProducts[index];
};

// Eliminar un producto
export const deleteProduct = async (id: string) => {
  await delay();
  const index = mockProducts.findIndex((p) => p.id === id);
  if (index === -1) throw new Error('Producto no encontrado');
  const [removed] = mockProducts.splice(index, 1);
  return removed;
};
