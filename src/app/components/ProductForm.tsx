'use client';
import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../api/apiProducts';

interface Product {
  id?: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
}

interface AddProductProps {
  onClose: () => void;
  refreshProducts: () => void;
  productToEdit?: Product;
}

const inputClass =
  'border border-slate-200 p-2.5 w-full rounded-lg mt-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500';

const AddProduct = ({ onClose, refreshProducts, productToEdit }: AddProductProps) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    category: '',
    price: '',
    stock: 0,
    image: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const stock = parseInt(formData.stock.toString(), 10);

    if (!formData.name || !formData.category || !formData.price || isNaN(stock) || !formData.image) {
      setError('Todos los campos son obligatorios.');
      setLoading(false);
      return;
    }

    try {
      const productData = { ...formData, stock };

      if (productToEdit) {
        await updateProduct(productToEdit.id!, productData);
      } else {
        await createProduct(productData);
      }
      setLoading(false);
      await refreshProducts();
      onClose();
    } catch (err) {
      setLoading(false);
      setError('Error al guardar el producto.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        {productToEdit ? 'Actualizar producto' : 'Agregar producto'}
      </h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="block text-sm text-slate-600">Nombre del producto</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s]*$/.test(value) || value === '') {
                handleChange(e);
              }
            }}
            className={inputClass}
            placeholder="Ejemplo: Vestido de verano"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="block text-sm text-slate-600">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s]*$/.test(value) || value === '') {
                handleChange(e);
              }
            }}
            className={inputClass}
            placeholder="Ejemplo: Vestido"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label htmlFor="price" className="block text-sm text-slate-600">Precio</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d+$/.test(value) || value === '') {
                  handleChange(e);
                }
              }}
              className={inputClass}
              placeholder="899.99"
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm text-slate-600">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d+$/.test(value) || value === '') {
                  handleChange(e);
                }
              }}
              className={inputClass}
              placeholder="10"
              min="1"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="image" className="block text-sm text-slate-600">URL de la imagen</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 text-sm font-medium"
            disabled={loading}
          >
            {loading ? 'Guardando…' : productToEdit ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
