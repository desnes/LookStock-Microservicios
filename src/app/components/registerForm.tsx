'use client';
import React, { useEffect, useState } from 'react';
import { createStock } from '../api/apiStockControl';
import { getAllProducts } from '../api/apiProducts';
import { useAuth } from '../../context/authContext';

interface RegisterFormProps {
  onClose: () => void;
  refreshStock: () => void;
}

interface ProductOption {
  id: string;
  name: string;
}

const inputClass =
  'border border-slate-200 p-2.5 w-full rounded-lg mt-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500';

const RegisterForm = ({ onClose, refreshStock }: RegisterFormProps) => {
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [productId, setProductId] = useState('');
  const [type, setType] = useState<'addition' | 'subtraction'>('addition');
  const [quantity, setQuantity] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      if (data.length > 0) setProductId(data[0].id);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const quantityChange = parseInt(quantity, 10);

    if (!productId || isNaN(quantityChange) || quantityChange <= 0) {
      setError('Selecciona un producto y una cantidad válida.');
      return;
    }

    setLoading(true);
    try {
      await createStock({
        productId,
        employeeId: user?.email || 'demo',
        type,
        quantityChange,
        comment,
      });
      await refreshStock();
      onClose();
    } catch (err) {
      setError('Error al registrar el movimiento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Registrar movimiento</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="product" className="block text-sm text-slate-600">Producto</label>
          <select
            id="product"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className={inputClass}
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label htmlFor="type" className="block text-sm text-slate-600">Tipo</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as 'addition' | 'subtraction')}
              className={inputClass}
            >
              <option value="addition">Entrada</option>
              <option value="subtraction">Salida</option>
            </select>
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm text-slate-600">Cantidad</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={inputClass}
              placeholder="10"
              min="1"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="comment" className="block text-sm text-slate-600">Comentario (opcional)</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={inputClass}
            placeholder="Ejemplo: Venta en tienda"
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
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 text-sm font-medium"
          >
            {loading ? 'Guardando…' : 'Registrar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
