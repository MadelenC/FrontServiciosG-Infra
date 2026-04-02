import React, { useState, useEffect } from "react";

export default function ProcessReturnForm({ isOpen, onClose, onSave, maintenance }) {
  const [formData, setFormData] = useState({
    serial: "",
    fecha: "",
    cantidad: "",
    nombre: "",
    detalle: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        serial: "",
        fecha: maintenance?.fecha || "",
        cantidad: "",
        nombre: "",
        detalle: "",
      });
    }
  }, [isOpen, maintenance]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({ ...formData, maintenanceId: maintenance?.id });
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 relative">
        
        {/* Cerrar */}
         <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200"
          aria-label="Cerrar formulario"
        >
          X
        </button>

        <h2 className="text-xl font-bold mb-4">Realizar Devolución</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <div>
            <label className="block font-medium mb-1">Serial</label>
            <input
              type="text"
              name="serial"
              value={formData.serial}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Ej. FGHDFH3131"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Ej. 1"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Ej. Compra de llantas"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Detalle</label>
            <textarea
              name="detalle"
              value={formData.detalle}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Detalle de la devolución"
            />
          </div>

          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}