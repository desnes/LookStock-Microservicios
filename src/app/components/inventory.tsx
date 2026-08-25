'use client';
import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../api/apiProducts';
import Modal from './Modal';
import AddProduct from './ProductForm';
import ConfirmDeleteModal from './DeleteProduct';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
  addedDate: string;
}

const LOW_STOCK = 10;
const MID_STOCK = 20;

const StockBadge = ({ stock }: { stock: number }) => {
  const style =
    stock <= LOW_STOCK
      ? 'bg-red-50 text-red-600'
      : stock <= MID_STOCK
      ? 'bg-amber-50 text-amber-600'
      : 'bg-emerald-50 text-emerald-600';
  const label = stock <= LOW_STOCK ? 'Stock bajo' : stock <= MID_STOCK ? 'Stock medio' : 'Disponible';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
};

const StatCard = ({ label, value, hint }: { label: string; value: string; hint?: string }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="text-2xl font-semibold text-slate-800 mt-1">{value}</p>
    {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
  </div>
);

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts();
        setInventoryData(products);
        setFilteredData(products);
      } catch (err) {
        setError('Error al cargar los datos del inventario.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(inventoryData);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = inventoryData.filter((product) =>
        product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, inventoryData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddProduct = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id);
      setIsDeleteModalOpen(false);
      refreshProducts();
    } catch (err) {
      console.error('Error al eliminar el producto', err);
      setError('Hubo un error al eliminar el producto.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const refreshProducts = async () => {
    const products = await getAllProducts();
    setInventoryData(products);
    setFilteredData(products);
  };

  if (loading) {
    return <p className="text-center text-slate-400 py-10">Cargando inventario…</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  const totalUnits = inventoryData.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = inventoryData.reduce((sum, p) => sum + p.stock * parseFloat(p.price || '0'), 0);
  const lowStockCount = inventoryData.filter((p) => p.stock <= LOW_STOCK).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Productos" value={String(inventoryData.length)} />
        <StatCard label="Unidades en stock" value={totalUnits.toLocaleString()} />
        <StatCard
          label="Valor del inventario"
          value={totalValue.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
        />
        <StatCard label="Stock bajo" value={String(lowStockCount)} hint={`≤ ${LOW_STOCK} unidades`} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-5 border-b border-slate-200">
          <div className="relative w-full sm:w-80">
            <img src="/icons/Search.svg" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar por nombre o categoría..."
              className="border border-slate-200 pl-9 pr-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
          >
            + Agregar producto
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 text-xs uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Producto</th>
                <th className="px-5 py-3 font-medium">Categoría</th>
                <th className="px-5 py-3 font-medium">Precio</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg object-cover bg-slate-100"
                      />
                      <div>
                        <p className="font-medium text-slate-800">{product.name}</p>
                        <p className="text-xs text-slate-400">Agregado {product.addedDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-700">
                    {parseFloat(product.price || '0').toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                  </td>
                  <td className="px-5 py-3 text-slate-700 font-medium">{product.stock}</td>
                  <td className="px-5 py-3">
                    <StockBadge stock={product.stock} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100"
                        title="Editar"
                      >
                        <img src="/icons/Edit.svg" alt="Editar" className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-red-50"
                        title="Eliminar"
                      >
                        <img src="/icons/Delete.svg" alt="Eliminar" className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <AddProduct onClose={closeModal} refreshProducts={refreshProducts} productToEdit={productToEdit ?? undefined} />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeModal}
          onConfirm={handleConfirmDelete}
          productName={productToDelete?.name || ''}
        />
      )}
    </div>
  );
};

export default Inventory;
