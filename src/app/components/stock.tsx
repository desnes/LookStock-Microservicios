"use client";
import React, { useEffect, useState } from "react";
import { getAllStock } from "../api/apiStockControl";
import Modal from "./Modal";
import RegisterForm from "./registerForm";

interface StockItem {
  nameProduct: string;
  nameEmployee: string;
  type: string;
  quantity: number;
  date: string;
}

const MovementBadge = ({ type }: { type: string }) => {
  const isEntrada = type === "Entrada";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isEntrada ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
      }`}
    >
      {isEntrada ? "↑" : "↓"} {type}
    </span>
  );
};

const StockControl = () => {
  const [stockData, setStockData] = useState<StockItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const handleAddStock = () => setIsModalOpen(true);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const data = await getAllStock();
      const formattedData: StockItem[] = data.map((log: any) => ({
        nameProduct: log.products?.name || "Producto desconocido",
        nameEmployee: log.employees?.name || "Empleado desconocido",
        type: log.type === "addition" ? "Entrada" : "Salida",
        quantity: log.quantityChange,
        date: new Date(log.timestamp).toLocaleDateString(),
      }));
      setStockData(formattedData.reverse());
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const filteredData = stockData.filter((item) =>
    item.nameProduct.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p className="text-center text-slate-400 py-10">Cargando movimientos…</p>;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-5 border-b border-slate-200">
        <div className="relative w-full sm:w-80">
          <img src="/icons/Search.svg" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar producto..."
            className="border border-slate-200 pl-9 pr-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleAddStock}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
        >
          + Registrar movimiento
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 text-xs uppercase tracking-wide">
              <th className="px-5 py-3 font-medium">Producto</th>
              <th className="px-5 py-3 font-medium">Empleado</th>
              <th className="px-5 py-3 font-medium">Tipo</th>
              <th className="px-5 py-3 font-medium">Cantidad</th>
              <th className="px-5 py-3 font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-slate-800">{item.nameProduct}</td>
                <td className="px-5 py-3 text-slate-600">{item.nameEmployee}</td>
                <td className="px-5 py-3">
                  <MovementBadge type={item.type} />
                </td>
                <td className="px-5 py-3 text-slate-700">{item.quantity}</td>
                <td className="px-5 py-3 text-slate-500">{item.date}</td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                  No hay movimientos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <RegisterForm onClose={closeModal} refreshStock={fetchStockData} />
        </Modal>
      )}
    </div>
  );
};

export default StockControl;
