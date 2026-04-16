import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function CreateJobApplicationForm({
  isOpen,
  onClose,
  onSave,
  vehiculos = [],
}) {
  const [formData, setFormData] = useState({
    vehiculo_id: "",
    descripcion: "",
    accesorioInput: "",
  });

  const [saving, setSaving] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const sugerenciasBase = [
    "Cambio de disco de embriague",
    "Cambio de aceite",
    "Revisión de frenos",
    "Cambio de llantas",
    "Afinamiento general",
  ];

  const sugerenciasFiltradas =
    formData.accesorioInput.trim() === ""
      ? []
      : sugerenciasBase.filter((item) =>
          item.toLowerCase().includes(formData.accesorioInput.toLowerCase())
        );

  // reset modal
  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      vehiculo_id: "",
      descripcion: "",
      accesorioInput: "",
    });

    setShowDropdown(false);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.vehiculo_id) {
      toast.error("Seleccione un vehículo 🚗");
      return;
    }

    if (!formData.descripcion) {
      toast.error("Ingrese una descripción 📝");
      return;
    }

    if (!formData.accesorioInput) {
      toast.warning("Seleccione o escriba un accesorio ⚙️");
      return;
    }

    const payload = {
      descripsoli: formData.descripcion,
      vehiculo_id: formData.vehiculo_id,
      accesorios: formData.accesorioInput,
    };

    try {
      setSaving(true);

      const response = await onSave(payload);

      if (!response?.ok) {
        toast.error(response?.error || "Error al guardar ❌");
        return;
      }

      toast.success("Solicitud registrada correctamente ✅");
      onClose();
    } catch (error) {
      toast.error("Error del servidor ❌");
    } finally {
      setSaving(false);
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

        {/* TITULO */}
        <h2 className="text-2xl font-bold text-center text-gray-700 mt-6">
          Solicitud de Trabajo
        </h2>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* VEHICULO */}
          <div>
            <label className="block mb-1 font-semibold">Movilidad</label>
            <select
              value={formData.vehiculo_id}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  vehiculo_id: e.target.value,
                }))
              }
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">Seleccione vehículo</option>
              {vehiculos.map((v) => (
                <option key={v.id} value={v.id}>
                  {[v.tipog, v.placa].filter(Boolean).join(" - ")}
                </option>
              ))}
            </select>
          </div>

          {/* ACCESORIOS (CORREGIDO) */}
          <div>
            <label className="block mb-1 font-semibold">Accesorios</label>

            <div className="relative">
              <input
                type="text"
                value={formData.accesorioInput}
                onChange={(e) => {
                  setFormData((p) => ({
                    ...p,
                    accesorioInput: e.target.value,
                  }));
                  setShowDropdown(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowDropdown(false), 150);
                }}
                placeholder="Buscar o escribir accesorio..."
                className="w-full border px-3 py-2 rounded-md"
              />

              {/* DROPDOWN CONTROLADO */}
              {showDropdown &&
                formData.accesorioInput.trim() !== "" &&
                sugerenciasFiltradas.length > 0 && (
                  <div className="absolute left-0 right-0 bg-white border rounded-md shadow-lg mt-1 max-h-40 overflow-auto z-50">
                    {sugerenciasFiltradas.map((item, i) => (
                      <div
                        key={i}
                        onMouseDown={() => {
                          setFormData((p) => ({
                            ...p,
                            accesorioInput: item,
                          }));

                          setShowDropdown(false);
                        }}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>

          {/* DESCRIPCION */}
          <div>
            <label className="block mb-1 font-semibold">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  descripcion: e.target.value,
                }))
              }
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* BOTON */}
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