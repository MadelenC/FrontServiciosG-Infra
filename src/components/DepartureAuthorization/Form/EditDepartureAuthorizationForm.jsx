import React, { useState, useEffect } from "react";

export default function EditDepartureAuthorizationForm({
  isOpen,
  onClose,
  onSave,
  choferes = [],
  vehiculos = [],
  initialData,
}) {
  const [formData, setFormData] = useState({
    chofer: "",
    movilidad: "",
    lugar: "",
    motivo: "",
    responsable: "",
    horaSalida: "",
    horaLlegada: "",
  });

  const [saving, setSaving] = useState(false);

  // 🔥 CARGA DATOS PARA EDIT
  useEffect(() => {
    if (!isOpen || !initialData) return;

    setFormData({
      chofer: initialData.chofer?.id || initialData.chofer || "",
      movilidad: initialData.vehiculo?.id || initialData.vehiculo || "",
      lugar: initialData.lugar || "",
      motivo: initialData.motivo || "",
      responsable: initialData.responsable || "",
      horaSalida: initialData.hsalida || "",
      horaLlegada: initialData.hllegada || "",
    });
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      chofer: formData.chofer,
      vehiculo: formData.movilidad,
      lugar: formData.lugar,
      motivo: formData.motivo,
      responsable: formData.responsable,
      hsalida: formData.horaSalida,
      hllegada: formData.horaLlegada,
    };

    setSaving(true);
    const response = await onSave(payload);
    setSaving(false);

    if (!response?.ok) {
      alert(response?.error || "Error al actualizar");
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-2xl relative">

         <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray font-bold bg-white-600 px-3 py-1 rounded hover:bg-gray-200"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Editar Autorización de Salida
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* CHOFER */}
          <div>
            <label className="block mb-1 font-semibold">Chofer</label>
            <select
              name="chofer"
              value={formData.chofer}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">Seleccione chofer</option>
              {choferes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombres} {c.apellidos}
                </option>
              ))}
            </select>
          </div>

          {/* VEHÍCULO */}
          <div>
            <label className="block mb-1 font-semibold">Movilidad</label>
            <select
              name="movilidad"
              value={formData.movilidad}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">Seleccione vehículo</option>
              {vehiculos.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.tipog} - {v.placa}
                </option>
              ))}
            </select>
          </div>

          {/* LUGAR */}
          <div>
            <label className="block mb-1 font-semibold">Lugar</label>
            <input
              type="text"
              name="lugar"
              value={formData.lugar}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* MOTIVO */}
          <div>
            <label className="block mb-1 font-semibold">Motivo</label>
            <input
              type="text"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* RESPONSABLE */}
          <div>
            <label className="block mb-1 font-semibold">Responsable</label>
            <input
              type="text"
              name="responsable"
              value={formData.responsable}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* HORAS */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-1 font-semibold">Hora de Salida</label>
              <input
                type="time"
                name="horaSalida"
                value={formData.horaSalida}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Hora de Llegada</label>
              <input
                type="time"
                name="horaLlegada"
                value={formData.horaLlegada}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-5 py-2 rounded-md"
            >
              Eliminar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-700 text-white px-5 py-2 rounded-md"
            >
              {saving ? "Actualizando..." : "Actualizar"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}