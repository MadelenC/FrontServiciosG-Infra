import React, { useState, useEffect } from "react";

export default function TripsCajaForm({ viajeData, choferes, encargados, vehiculos, onClose, onSubmit }) {
  const [form, setForm] = useState({
    vehiculo: "",
    chofer: "",
    encargado: "",
    kmRecorridos: viajeData?.km || 0,
    litros: 0,
    nroVuelta: "",
    fechaVuelta: "",
    nroOrden: "",
    objetivo: viajeData?.objetivo || "",
  });

  // Inicializa los selects según los datos del viaje o el primer elemento de la lista
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      kmRecorridos: viajeData?.km || 0,
      objetivo: viajeData?.objetivo || "",
      vehiculo: viajeData?.vehiculo || vehiculos?.[0]?.nombre || "",
      chofer: viajeData?.chofer || choferes?.[0]?.nombres + " " + choferes?.[0]?.apellidos || "",
      encargado: viajeData?.encargado || encargados?.[0]?.nombres + " " + encargados?.[0]?.apellidos || "",
    }));
  }, [viajeData, choferes, encargados, vehiculos]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (typeof onSubmit === "function") {
      onSubmit(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50 overflow-y-auto">
      <div className="bg-white w-[95%] sm:w-[80%] md:w-[60%] max-w-[800px] p-6 rounded-xl shadow-lg space-y-4">

        <h2 className="text-2xl font-bold mb-4">Presupuesto de viaje por caja</h2>

        {/* Datos generales */}
        <div className="grid grid-cols-3 gap-4">
          {/* Vehículo */}
          <div>
            <label className="block font-semibold">Vehículo</label>
            <select
              value={form.vehiculo}
              onChange={(e) => handleChange("vehiculo", e.target.value)}
              className="border rounded px-3 py-1 w-full"
            >
              <option value="">Seleccione un vehículo</option>
              {vehiculos?.map((v) => (
                <option key={v.id} value={v.nombre || v.asignacion}>{v.nombre || v.asignacion}</option>
              ))}
            </select>
          </div>

          {/* Chofer */}
          <div>
            <label className="block font-semibold">Chofer</label>
            <select
              value={form.chofer}
              onChange={(e) => handleChange("chofer", e.target.value)}
              className="border rounded px-3 py-1 w-full"
            >
              <option value="">Seleccione un chofer</option>
              {choferes?.map((c) => (
                <option key={c.id} value={`${c.nombres} ${c.apellidos}`}>
                  {c.nombres} {c.apellidos}
                </option>
              ))}
            </select>
          </div>

          {/* Encargado */}
          <div>
            <label className="block font-semibold">Encargado del viaje</label>
            <select
              value={form.encargado}
              onChange={(e) => handleChange("encargado", e.target.value)}
              className="border rounded px-3 py-1 w-full"
            >
              <option value="">Seleccione un encargado</option>
              {encargados?.map((e) => (
                <option key={e.id} value={`${e.nombres} ${e.apellidos}`}>
                  {e.nombres} {e.apellidos}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Información del viaje */}
        <div className="border rounded p-4 mt-4 space-y-2">
          <p className="font-semibold">
            Viaje: {viajeData?.nombre || "CARRERA DE ARTES PLÁSTICAS DE LA UATF"} con {form.kmRecorridos} km.
          </p>
          <p className="font-semibold">Kilometraje Total: {form.kmRecorridos} km</p>

          <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
              <label className="block font-semibold">Gasolina/Diesel (Litros)</label>
              <input
                type="number"
                value={form.litros}
                onChange={(e) => handleChange("litros", Number(e.target.value))}
                className="border rounded px-3 py-1 w-full"
              />
            </div>

            <div>
              <label className="block font-semibold">Nro. de vuelta</label>
              <input
                type="text"
                value={form.nroVuelta}
                onChange={(e) => handleChange("nroVuelta", e.target.value)}
                className="border rounded px-3 py-1 w-full"
              />
            </div>

            <div>
              <label className="block font-semibold">Fecha de vuelta</label>
              <input
                type="date"
                value={form.fechaVuelta}
                onChange={(e) => handleChange("fechaVuelta", e.target.value)}
                className="border rounded px-3 py-1 w-full"
              />
            </div>

            <div>
              <label className="block font-semibold">Nro. de orden</label>
              <input
                type="text"
                value={form.nroOrden}
                onChange={(e) => handleChange("nroOrden", e.target.value)}
                className="border rounded px-3 py-1 w-full"
              />
            </div>

            {/* Objetivo solo lectura */}
            <div className="col-span-2">
              <label className="block font-semibold">Objetivo del viaje</label>
              <textarea
                value={form.objetivo}
                readOnly
                className="border rounded px-3 py-1 w-full bg-gray-100"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}