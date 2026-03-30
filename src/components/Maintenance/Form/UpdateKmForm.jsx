import React, { useState } from "react";

export default function UpdateKmForm({ vehicle, onUpdateKm, onClose }) {
  const [increment, setIncrement] = useState(0);

  // Calcula el kilometraje total
  const totalKm = Number(vehicle.kilometraje || 0) + Number(increment || 0);

  const handleChange = (e) => setIncrement(e.target.value);

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdateKm?.({ ...vehicle, kilometraje: totalKm });
    onClose?.();
  };

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 relative">
        <h2 className="pt-5 text-lg font-semibold text-gray-800 mb-4">
          Actualizar Kilometraje
        </h2>

        <p className="mb-2">
          Actualmente el Vehículo: <span className="font-semibold">{vehicle.tipo} {vehicle.placa}</span>
        </p>
        <p className="mb-4">
          Tiene un kilometraje de: <span className="font-semibold">{vehicle.kilometraje} Km</span>
        </p>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Aumentar (Km)</label>
            <input
              type="number"
              value={increment}
              onChange={handleChange}
              className="h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Km Total</label>
            <input
              type="number"
              value={totalKm}
              readOnly
              className="h-10 px-3 border border-gray-300 rounded-md bg-gray-100 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-900 text-sm"
            >
              Actualizar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-[2.5rem] leading-none p-2"
        >
          ×
        </button>
      </div>
    </div>
  );
}