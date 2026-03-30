import React, { useState, useEffect } from "react";

export default function CreateJobForm({ isOpen, onClose, onSave, application }) {
  const [formData, setFormData] = useState({
    kilometraje: "",
    fechaTrabajo: "",
    cantidad: "",
    nombrePieza: "",
    trabajoRealizado: "",
    marca: "",
    codigo: "",
    observacion: "",
  });

  const [saving, setSaving] = useState(false);

  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      applicationId: application.id,
      ...formData,
    };
    const response = await onSave(payload);
    setSaving(false);
    if (response?.ok) onClose();
    else alert(response?.error || "Error al guardar trabajo");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl relative h-[90vh] flex flex-col">
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-700 mt-6">
          Realizar Trabajo
        </h2>

        <p className="text-sm text-center mb-4 px-6">
          <span className="text-green-600 font-semibold">■ Los campos en verde son obligatorios.</span>{" "}
          <span className="text-blue-500 font-semibold">■ Los campos en azul son opcionales.</span>
        </p>

        {/* Contenido scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Solicitud de Trabajo (No editable) */}
            <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Solicitud de Trabajo</h3>
              <p><strong>Fecha:</strong> {today}</p>
              <p><strong>Chofer:</strong> {application.chofer || ""}</p>
              <p><strong>Vehículo:</strong> {application.vehiculo?.placa} - {application.vehiculo?.tipog}</p>
              <p><strong>Trabajo:</strong> {application.accesorios?.length
                ? application.accesorios.map(a => a.solicitud).join(", ")
                : "-"}</p>
              <p><strong>Detalle:</strong> {application.descripcion}</p>
            </div>

            {/* Trabajo Realizado */}
            <div className="p-4 border border-gray-300 rounded-md bg-white">
              <h3 className="text-lg font-semibold mb-2">Trabajo Realizado</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="text-green-600 font-semibold">Kilometraje*</label>
                  <input
                    type="number"
                    name="kilometraje"
                    value={formData.kilometraje}
                    onChange={handleChange}
                    placeholder="Ejm. 18965"
                    className="w-full border px-3 py-2 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="text-green-600 font-semibold">Fecha*</label>
                  <input
                    type="date"
                    name="fechaTrabajo"
                    value={formData.fechaTrabajo}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="text-green-600 font-semibold">Cantidad*</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    placeholder="Ejm. 1"
                    className="w-full border px-3 py-2 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="text-green-600 font-semibold">Nombre*</label>
                  <input
                    type="text"
                    name="nombrePieza"
                    value={formData.nombrePieza}
                    onChange={handleChange}
                    placeholder="Ejm. piezas"
                    className="w-full border px-3 py-2 rounded-md"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-green-600 font-semibold">Trabajo realizado*</label>
                  <textarea
                    name="trabajoRealizado"
                    value={formData.trabajoRealizado}
                    onChange={handleChange}
                    placeholder="Escriba un trabajo realizado"
                    className="w-full border px-3 py-2 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="text-blue-500 font-semibold">Marca</label>
                  <input
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    placeholder="Ejm. Castrol"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>

                <div>
                  <label className="text-blue-500 font-semibold">Código</label>
                  <input
                    type="text"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    placeholder="Ejm. 10W40"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-blue-500 font-semibold">Observación</label>
                  <textarea
                    name="observacion"
                    value={formData.observacion}
                    onChange={handleChange}
                    placeholder="Escriba una observación del trabajo"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Botones fijos */}
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-2 rounded-md"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-blue-700 text-white px-5 py-2 rounded-md"
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}