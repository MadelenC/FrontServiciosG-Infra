import React, { useState } from "react";
import { toast } from "react-toastify";

export default function InformeRechazadoForm({
  onRegister,
  onClose,
}) {
  const [informe, setInforme] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!informe.trim()) {
    toast.error("Debes escribir un informe");
    return;
  }

  onRegister?.({
    informe: informe,
  });

  toast.success("Informe registrado correctamente ✅");

  onClose?.();
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative dark:bg-gray-800">

        <h2 className="text-xl font-semibold text-gray-800 mb-6 dark:text-gray-200">
         Realizar informe de trabajos 
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

         
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
              Informe de trabajo
            </label>

            <textarea
              value={informe}
              onChange={(e) => setInforme(e.target.value)}
              placeholder="Escribe el informe aquí..."
              className="w-full h-28 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
            >
              Registrar
            </button>

          </div>

        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-3xl"
        >
          ×
        </button>

      </div>

    </div>
  );
}