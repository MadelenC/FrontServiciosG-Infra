import React from "react";

export default function SearchBarApplication({ chofer, setChofer, vehiculo, setVehiculo }) {
  return (
    <div className="flex flex-col md:flex-row justify-start mb-4 gap-2 items-center">

      {/* Búsqueda Chofer */}
      <input
        type="text"
        placeholder="Buscar por Chofer"
        value={chofer}
        onChange={(e) => setChofer(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />

      {/* Búsqueda Vehículo */}
      <input
        type="text"
        placeholder="Buscar por Vehículo"
        value={vehiculo}
        onChange={(e) => setVehiculo(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />

    </div>
  );
}
