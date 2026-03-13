import React, { useState, useEffect } from "react";

export default function ReservaModal({ isOpen, onClose, onSave, initialData = null, encargados = [] }) {
  const [formData, setFormData] = useState({
    encargado: "",
    fechaInicial: "",
    fechaFinal: "",
    entidad: "",
    objetivo: "",
    pasajeros: "",
  });

  const [saving, setSaving] = useState(false);

  // Cada vez que cambia initialData o encargados, inicializamos correctamente
  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      encargado: initialData?.user?.id || "",
      fechaInicial: initialData?.fecha_inicial?.slice(0, 16) || "",
      fechaFinal: initialData?.fecha_final?.slice(0, 16) || "",
      entidad: initialData?.entidad || "",
      objetivo: initialData?.objetivo || "",
      pasajeros: initialData?.pasajeros || "",
    });
  }, [isOpen, initialData, encargados]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.encargado) {
      alert("Seleccione un encargado");
      return;
    }

    const payload = {
      user_id: formData.encargado,
      fecha_inicial: formData.fechaInicial,
      fecha_final: formData.fechaFinal,
      entidad: formData.entidad,
      objetivo: formData.objetivo,
      pasajeros: Number(formData.pasajeros),
    };

    setSaving(true);
    const response = await onSave(payload);
    setSaving(false);

    if (!response?.ok) {
      alert(response?.error || "Error al guardar");
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {initialData ? "Editar Reserva" : "Nueva Reserva"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Encargados */}
          <div>
            <label className="block mb-1 text-gray-900 text-sm font-semibold">Encargados</label>
            <select
              name="encargado"
              value={formData.encargado}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md text-sm"
            >
              <option value="">Seleccione encargado</option>
              {encargados?.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombres} {u.apellidos}
                </option>
              ))}
            </select>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Fecha Inicial</label>
              <input
                type="datetime-local"
                name="fechaInicial"
                value={formData.fechaInicial}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md border-gray-300"
              />
            </div>
            <div>
              <label>Fecha Final</label>
              <input
                type="datetime-local"
                name="fechaFinal"
                value={formData.fechaFinal}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md border-gray-300"
              />
            </div>
          </div>

          {/* Otros campos */}
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="entidad"
              placeholder="Entidad"
              value={formData.entidad}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md border-gray-300"
            />
            <input
              type="text"
              name="objetivo"
              placeholder="Objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md border-gray-300"
            />
            <input
              type="number"
              name="pasajeros"
              placeholder="Pasajeros"
              value={formData.pasajeros}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md border-gray-300"
            />
          </div>

          {/* Botones */}
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
  );
}