import React, { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

export default function AddExceptionForm({ travel, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    chofer: travel.chofer || "",
    tipoViaje: "",
    lugar: "",
    fecha: new Date().toISOString().slice(0, 16),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validación
    if (!formData.tipoViaje || !formData.lugar) {
      toast.error("❌ Complete todos los campos");
      return;
    }

    // ✅ PAYLOAD CORRECTO
    const payload = {
      chofer_id: travel.chofer_id,       // ✔ número
      rol_id: travel.id,                // ✔ relación
      tipo: formData.tipoViaje,         // ✔ mapeo
      lugar: formData.lugar,
      fecha: formData.fecha.split("T")[0], // ✔ formato DATE
    };

    try {
      const res = await onAdd?.(payload);

      if (res?.ok || res === true) {
        toast.success("✅ Excepción registrada correctamente");
        onClose();
      } else {
        toast.error("❌ No se pudo registrar la excepción");
      }
    } catch (error) {
      toast.error("⚠️ Error inesperado");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Insertar Excepción</h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Chofer</label>
            <input
              type="text"
              value={formData.chofer}
              readOnly
              className="h-10 px-3 border rounded-md"
            />
          </div>

          <input
            name="tipoViaje"
            value={formData.tipoViaje}
            onChange={handleChange}
            placeholder="Tipo de viaje"
            className="h-10 px-3 border rounded-md"
          />

          <input
            name="lugar"
            value={formData.lugar}
            onChange={handleChange}
            placeholder="Lugar"
            className="h-10 px-3 border rounded-md"
          />

          <input
            type="datetime-local"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="h-10 px-3 border rounded-md"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Insertar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}