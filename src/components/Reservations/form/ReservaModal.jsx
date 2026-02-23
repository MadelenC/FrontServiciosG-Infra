import React, { useState, useEffect } from "react";

export default function ReservaModal({ reserva, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    entidad: "",
    encargado: "",
    objetivo: "",
    pasajeros: "",
    inicio: "",
    final: "",
    dias: "",
  });

  // Cuando cambia la reserva (al abrir modal), carga datos
  useEffect(() => {
    if (reserva) {
      setFormData({
        entidad: reserva.entidad || "",
        encargado: reserva.encargado || "",
        objetivo: reserva.objetivo || "",
        pasajeros: reserva.pasajeros || "",
        inicio: reserva.inicio || "",
        final: reserva.final || "",
        dias: reserva.dias || "",
      });
    }
  }, [reserva]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
          aria-label="Cerrar modal"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Concretar Reserva</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label>
            Entidad:
            <input
              type="text"
              name="entidad"
              value={formData.entidad}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </label>
          <label>
            Encargado:
            <input
              type="text"
              name="encargado"
              value={formData.encargado}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </label>
          <label>
            Objetivo:
            <input
              type="text"
              name="objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </label>
          <label>
            Pasajeros:
            <input
              type="number"
              name="pasajeros"
              value={formData.pasajeros}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </label>
          <label>
            Inicio:
            <input
              type="date"
              name="inicio"
              value={formData.inicio}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </label>
          <label>
            Final:
            <input
              type="date"
              name="final"
              value={formData.final}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </label>
          <label>
            Días:
            <input
              type="number"
              name="dias"
              value={formData.dias}
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
            />
          </label>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}