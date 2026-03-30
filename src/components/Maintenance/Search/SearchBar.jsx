import React from "react";

export default function SearchBarApplication({
  chofer,
  setChofer,
  vehiculo,
  setVehiculo,
  listaChoferes,
  listaVehiculos
}) {
  return (
    <div className="flex flex-col md:flex-row justify-start mb-4 gap-2 items-center">

      {/* Select Chofer */}
       {/* Select Chofer */}
      <select
        value={chofer}
        onChange={(e) => setChofer(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Seleccione un chofer</option>
        {(listaChoferes || []).map((c, index) => (
          <option key={index} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      {/* Select Vehículo */}
      <select
        value={vehiculo}
        onChange={(e) => setVehiculo(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Seleccione un vehículo</option>
        {listaVehiculos?.map((v) => (
          <option key={v.id} value={v.id}>
            {v.placa} - {v.tipog}
          </option>
        ))}
      </select>

    </div>
  );
}
