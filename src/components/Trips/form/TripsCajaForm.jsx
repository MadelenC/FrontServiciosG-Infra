import React, { useState, useEffect } from "react";

export default function TripsCajaForm({
  viajeData,
  choferes,
  encargados,
  vehiculos,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState({
    vehiculo: "",
    chofer: "",
    encargado: "",
    kmRecorridos: 0,
    litros: 0,
    nroVuelta: "",
    fechaVuelta: "",
    nroOrden: "",
    objetivo: "",
  });

  // Inicializar correctamente con IDs
  useEffect(() => {
    if (!viajeData) return;

    setForm({
      vehiculo: viajeData.vehiculo || "",
      chofer: viajeData.chofer || "",
      encargado: viajeData.encargado || "",
      kmRecorridos: viajeData.km || 0,
      litros: 0,
      nroVuelta: "",
      fechaVuelta: "",
      nroOrden: "",
      objetivo: viajeData.objetivo || "",
    });
  }, [viajeData]);

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
      <div className="bg-white w-[95%] sm:w-[80%] md:w-[60%] max-w-[800px] p-6 rounded-xl shadow-lg space-y-6 relative">
 
       <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray font-bold bg-white-600 px-3 py-1 rounded hover:bg-gray-200"
        >
          X
        </button>

        <h2 className="text-2xl font-bold">
          Presupuesto de viaje por caja
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block ">Vehículo:</label>
            <select
              value={form.vehiculo}
              onChange={(e) => handleChange("vehiculo", e.target.value)}
              className="border rounded px-3 py-1 w-full"
            >
              <option value="">Seleccione un vehículo</option>
              {vehiculos?.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.tipog} {v.placa}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block ">Chofer:</label>
            <select
              value={form.chofer}
              onChange={(e) => handleChange("chofer", e.target.value)}
              className="border rounded px-3 py-1 w-full"
            >
              <option value="">Seleccione un chofer</option>
              {choferes?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombres} {c.apellidos}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block ">Encargado del viaje:</label>
            <select
              value={form.encargado}
              onChange={(e) => handleChange("encargado", e.target.value)}
              className="border rounded px-3 py-1 w-full"
            >
              <option value="">Seleccione un encargado</option>
              {encargados?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombres} {e.apellidos}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className=" space-y-1">
          <p className="text-sm font-semibold">
            Viaje: {viajeData?.entidad || "SIN NOMBRE"} con {form.kmRecorridos} km.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font">
              Klometraje Total:
            </label>
            <input
              type="number"
              value={form.litros}
              onChange={(e) => handleChange("litros", Number(e.target.value))}
              className="border rounded px-3 py-1 w-full"
            />
          </div>

          <div>
            <label className="block font">
              Gasolina/Diesel(Litros):
            </label>
            <input
              type="number"
              value={form.litros}
              onChange={(e) => handleChange("litros", Number(e.target.value))}
              className="border rounded px-3 py-1 w-full"
            />
          </div>
          <div>
            <label className="block ">
              Litros:
            </label>
            <input
              type="number"
              value={form.litros}
              readOnly
              className="border rounded px-3 py-1 w-full"
            />
          </div>

          <div>
            <label className="block font-size">
              Nro. de vuelta:
            </label>
            <input
              type="text"
              value={form.nroVuelta}
              onChange={(e) => handleChange("nroVuelta", e.target.value)}
              className="border rounded px-3 py-1 w-full"
            />
          </div>

          <div>
            <label className="block font-size ">
              Fecha del Nro. vuelta:
            </label>
            <input
              type="date"
              value={form.fechaVuelta}
              onChange={(e) => handleChange("fechaVuelta", e.target.value)}
              className="border rounded px-3 py-1 w-full"
            />
          </div>

          <div>
            <label className="block ">
              Nro. de orden:
            </label>
            <input
              type="text"
              value={form.nroOrden}
              onChange={(e) => handleChange("nroOrden", e.target.value)}
              className="border rounded px-3 py-1 w-full"
            />
          </div>
        </div>
        <div>
          <label className="block ">
            Objetivo del viaje:
          </label>

          <textarea
            value={form.objetivo}
            onChange={(e) => handleChange("objetivo", e.target.value)}
            className="border rounded px-3 py-2 w-full min-h-[90px]"
          />
        </div>
        <div className="flex justify-end gap-3">
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