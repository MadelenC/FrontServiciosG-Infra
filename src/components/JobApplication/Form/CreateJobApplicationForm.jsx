import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function CreateJobApplicationForm({
  isOpen,
  onClose,
  onSave,
  vehiculos = [],       
  accesorios = [],     
}) {
  const [formData, setFormData] = useState({
    vehiculo_id: "",
    accesorios: [],
    descripcion: "",
  });

  const [saving, setSaving] = useState(false);

  // Resetear formulario cuando se abre
  useEffect(() => {
    if (!isOpen) return;
    setFormData({
      vehiculo_id: "",
      accesorios: [],
      descripcion: "",
    });
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccesoriosChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const values = options.map((opt) => opt.value);
    setFormData((prev) => ({ ...prev, accesorios: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.vehiculo_id) {
      toast.error("Seleccione un vehículo");
      return;
    }

    if (!formData.descripcion) {
      toast.error("Ingrese una descripción");
      return;
    }

    const payload = {
      descripsoli: formData.descripcion,
      vehiculo_id: formData.vehiculo_id,
      accesorios: formData.accesorios,
    };

    setSaving(true);
    const response = await onSave(payload);
    setSaving(false);

    if (!response?.ok) {
      toast.error(response?.error || "Error al guardar");
    } else {
      toast.success("✅ Solicitud registrada");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl relative">

        {/* CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 font-bold px-3 py-1 rounded hover:bg-gray-200"
        >
          X
        </button>

        {/* TÍTULO */}
        <h2 className="text-2xl font-bold text-center text-gray-700 mt-6">
          Solicitud de Trabajo
        </h2>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* VEHÍCULO */}
          <div>
            <label className="block mb-1 font-semibold">Movilidad</label>
            <select
              name="vehiculo_id"
              value={formData.vehiculo_id}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">Seleccione vehículo</option>
              {vehiculos?.map((v) => (
                <option key={v.id} value={v.id}>
                  {[v.tipog, v.placa].filter(Boolean).join(" - ")}
                </option>
              ))}
            </select>
          </div>

          {/* ACCESORIOS */}
          <div>
            <label className="block mb-1 font-semibold">Accesorios</label>
            <select
              multiple
              value={formData.accesorios}
              onChange={handleAccesoriosChange}
              className="w-full border px-3 py-2 rounded-md h-28"
            >
              {accesorios?.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <label className="block mb-1 font-semibold">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* BOTÓN */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-blue-600 text-white rounded-md"
            >
              {saving ? "Guardando..." : "Registrar"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}