import React from 'react';

interface DeleteProductProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

const DeleteProduct = ({ isOpen, onClose, onConfirm, productName }: DeleteProductProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold text-slate-800 text-center mb-2">¿Eliminar producto?</h2>
        <p className="text-center text-sm text-slate-500 mb-6">
          "{productName}" se eliminará de forma permanente del inventario.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm font-medium"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
