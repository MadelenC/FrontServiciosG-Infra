import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function AddExceptionForm({ travel, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    chofer: travel.chofer || "",
    tipoViaje: "",
    lugar: "",
    fecha: new Date().toISOString().slice(0, 16), // YYYY-MM-DDTHH:mm
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd?.(formData);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Insertar Excepción</h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* Chofer */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Chofer</label>
            <input
              type="text"
              name="chofer"
              value={formData.chofer}
              readOnly
              className="h-10 px-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Tipo de Viaje */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Tipo de Viaje</label>
            <input
              type="text"
              name="tipoViaje"
              value={formData.tipoViaje}
              onChange={handleChange}
              placeholder="Tipo de viaje"
              className="h-10 px-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Lugar */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Lugar</label>
            <input
              type="text"
              name="lugar"
              value={formData.lugar}
              onChange={handleChange}
              placeholder="Inserte el lugar del viaje"
              className="h-10 px-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Fecha */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="datetime-local"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="h-10 px-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Insertar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
