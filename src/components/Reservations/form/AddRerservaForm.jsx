import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddReservaModal({ isOpen, onClose, onSave, encargados = [] }) {
  const [formData, setFormData] = useState({
    encargado: "",
    fechaInicial: "",
    fechaFinal: "",
    entidad: "",
    objetivo: "",
    pasajeros: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setFormData({
      encargado: "",
      fechaInicial: "",
      fechaFinal: "",
      entidad: "",
      objetivo: "",
      pasajeros: "",
    });
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.encargado) {
      toast.error("Seleccione un encargado");
      return;
    }

    const payload = {
      user_id: Number(formData.encargado),
      fecha_inicial: formData.fechaInicial + ":00",
      fecha_final: formData.fechaFinal + ":00",
      entidad: formData.entidad,
      objetivo: formData.objetivo,
      pasajeros: Number(formData.pasajeros),
    };

    console.log("Payload a enviar:", payload);

    setSaving(true);
    const response = await onSave(payload);
    setSaving(false);

    if (!response?.ok) {
      toast.error(response?.error || "Error al guardar");
    } else {
      toast.success("Reserva creada correctamente");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">
        <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Nueva Reserva
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold">
                Encargado
              </label>
              <select
                name="encargado"
                value={formData.encargado}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value="">Seleccione encargado</option>
                {encargados?.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nombres} {u.apellidos}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Fecha Inicial</label>
                <input
                  type="datetime-local"
                  name="fechaInicial"
                  value={formData.fechaInicial}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label>Fecha Final</label>
                <input
                  type="datetime-local"
                  name="fechaFinal"
                  value={formData.fechaFinal}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="entidad"
                placeholder="Entidad"
                value={formData.entidad}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                type="text"
                name="objetivo"
                placeholder="Objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                type="number"
                name="pasajeros"
                placeholder="Pasajeros"
                value={formData.pasajeros}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-5 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-700 text-white px-5 py-2 rounded-md"
              >
                {saving ? "Guardando..." : "Registrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}