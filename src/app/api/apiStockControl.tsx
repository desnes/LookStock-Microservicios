// Datos quemados para permitir que el frontend funcione de forma independiente,
// sin necesidad de los microservicios de backend (uso como demo/portafolio).
import { mockStockLogs } from './mockData';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllStock = async () => {
  await delay();
  return [...mockStockLogs];
};

export const createStock = async (stockData: {
  productId: string;
  employeeId: string;
  type: string;
  quantityChange: number;
  comment?: string;
}) => {
  await delay();
  const newLog = {
    ...stockData,
    timestamp: new Date().toISOString(),
    products: { name: `Producto ${stockData.productId}` },
    employees: { name: `Empleado ${stockData.employeeId}` },
  };
  mockStockLogs.push(newLog);
  return newLog;
};
