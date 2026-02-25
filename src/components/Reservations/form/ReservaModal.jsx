import React, { useState, useEffect } from "react";

export default function ReservaModal({ reserva, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    destinos: [
      { nombre: "", km: "" },
      { nombre: "", km: "" },
      { nombre: "", km: "" },
      { nombre: "", km: "" },
      { nombre: "", km: "" },
    ],
    kmAdicional: "",
    tipoViaje: "",
    pasajeros: "",
    inicio: "",
    final: "",
    chofer: "",
    vehiculo: "",
    encargado: "",
    entidad: "",
    objetivo: "",
  });

  useEffect(() => {
    if (reserva) {
      const formatDateTime = (d) => {
        if (!d) return "";
        const date = new Date(d);
        const iso = date.toISOString();
        return iso.substring(0, 16); // yyyy-mm-ddTHH:MM
      };

      setFormData({
        destinos:
          reserva.destinos?.map((d) => ({
            nombre: d.nombre || "",
            km: d.km || "",
          })) || [
            { nombre: "", km: "" },
            { nombre: "", km: "" },
            { nombre: "", km: "" },
            { nombre: "", km: "" },
            { nombre: "", km: "" },
          ],
        kmAdicional: reserva.kmAdicional || "",
        tipoViaje: reserva.tipoViaje || "",
        pasajeros: reserva.pasajeros || "",
        inicio: formatDateTime(reserva.fecha_inicial),
        final: formatDateTime(reserva.fecha_final),
        chofer: reserva.chofer || "",
        vehiculo: reserva.vehiculo || "",
        encargado: reserva.encargado || "",
        entidad: reserva.entidad || "",
        objetivo: reserva.objetivo || "",
      });
    }
  }, [reserva]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleDestinoChange = (index, field, value) => {
    const nuevosDestinos = [...formData.destinos];
    nuevosDestinos[index][field] = value;
    setFormData((f) => ({ ...f, destinos: nuevosDestinos }));
  };

  const calcularTotalKm = () => {
    let total = Number(formData.kmAdicional || 0);
    formData.destinos.forEach((d) => {
      total += Number(d.km || 0);
    });
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">
      <div className="bg-gray-50 w-full max-w-4xl max-h-[80vh] p-6 rounded-xl shadow-2xl text-gray-800 overflow-hidden flex flex-col">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4 text-gray-900 flex-shrink-0">
          Nuevo Viaje
        </h2>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto flex-grow pr-3 space-y-6"
        >
          {/* Destinos */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-md font-semibold mb-3 text-gray-900 border-b pb-1">
              Inserte los destinos del viaje
            </h3>
            <div className="space-y-2">
              {formData.destinos.map((d, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Destino"
                    value={d.nombre}
                    onChange={(e) =>
                      handleDestinoChange(i, "nombre", e.target.value)
                    }
                    className="flex-1 border border-gray-300 px-3 py-1.5 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Km."
                    value={d.km}
                    onChange={(e) =>
                      handleDestinoChange(i, "km", e.target.value)
                    }
                    className="w-20 border border-gray-300 px-3 py-1.5 rounded-md shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4 items-center">
              <input
                type="number"
                name="kmAdicional"
                placeholder="Km. adicional"
                value={formData.kmAdicional}
                onChange={handleChange}
                className="w-36 border border-gray-300 px-3 py-1.5 rounded-md shadow-sm text-sm"
              />
              <input
                type="text"
                value={calcularTotalKm()}
                readOnly
                className="w-28 border border-gray-300 px-3 py-1.5 rounded-md bg-gray-100 font-semibold text-sm"
              />
            </div>
          </div>

          {/* Información general */}
          <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1 text-gray-900 text-sm">
                Tipo de viaje
              </label>
              <select
                name="tipoViaje"
                value={formData.tipoViaje}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-1.5 rounded-md shadow-sm text-sm"
              >
                <option value="">Seleccione</option>
                <option>Viaje de Práctica</option>
                <option>Viaje de Inspección</option>
                <option>Viaje Académico</option>
                <option>Viaje de Cultura</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-1 text-gray-900 text-sm">
                Número de pasajeros
              </label>
              <input
                type="number"
                name="pasajeros"
                value={formData.pasajeros}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-1.5 rounded-md shadow-sm text-sm"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 text-gray-900 text-sm">
                Fecha de inicio
              </label>
              <input
                type="datetime-local"
                name="inicio"
                value={formData.inicio}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-1.5 rounded-md shadow-sm text-sm"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 text-gray-900 text-sm">
                Fecha de fin del viaje
              </label>
              <input
                type="datetime-local"
                name="final"
                value={formData.final}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-1.5 rounded-md shadow-sm text-sm"
              />
            </div>
          </div>

          {/* Datos del viaje */}
          <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-3 gap-4">
            <div>
              <label className="font-semibold block mb-1 text-gray-900 text-sm">
                Choferes
              </label>
              <select
                name="chofer"
                value={formData.chofer}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-1.5 rounded-md shadow-sm text-sm"
              >
                <option value="">Seleccione chofer</option>
                <option>Alberto Encinas Escalante</option>
                <option>Alfredo Pinto Rosso</option>
                <option>Edgar Sandoval Gonzales</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1 text-gray-900 text-sm">
                Vehículos
              </label>
              <select
                name="vehiculo"
                value={formData.vehiculo}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-1.5 rounded-md shadow-sm text-sm"
              >
                <option value="">Seleccione vehículo</option>
                <option>Automovil 855-XEA</option>
                <option>Buss MKB210 3981-RBN</option>
                <option>Camioneta 1343-LPY</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1 text-gray-900 text-sm">
                Encargados
              </label>
              <select
                name="encargado"
                value={formData.encargado}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-1.5 rounded-md shadow-sm text-sm"
              >
                <option value="">Seleccione encargado</option>
                <option>Ing. Juan Carlos Erquicia Landeau</option>
                <option>Lic. Alberto Morales Colque</option>
                <option>Abg. Alberto Llanos Martinez</option>
              </select>
            </div>
          </div>

          {/* Entidad y objetivo */}
          <div className="bg-white p-4 rounded-lg shadow-sm border space-y-3">
            <div>
              <label className="font-semibold block mb-1 text-gray-900 text-sm">
                Entidad
              </label>
              <input
                type="text"
                name="entidad"
                value={formData.entidad}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-1.5 rounded-md shadow-sm text-sm"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-gray-900 text-sm">
                Objetivo
              </label>
              <textarea
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-1.5 rounded-md shadow-sm text-sm"
                rows={3}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-1.5 rounded-md text-sm"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-1.5 rounded-md text-sm"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}