import React from "react";

export default function VehicleDetail({ vehicle, onClose }) {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative animate-slide-down">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Detalle del vehículo
          </h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-[2.5rem] leading-none p-2"
          >
            ×
          </button>
        </div>

        {/* Subtitulo con placa */}
        <p className="text-sm text-gray-500 mb-4">
          Placa: <span className="font-medium text-blue-600">{vehicle.placa}</span>
        </p>

        {/* Detalles del vehículo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div><span className="font-medium">Código:</span> {vehicle.asignacion}</div>
          <div><span className="font-medium">Color:</span> {vehicle.color}</div>
          <div><span className="font-medium">Nro. Asientos:</span> {vehicle.asientos}</div>
          <div><span className="font-medium">Kilometraje:</span> {vehicle.kilometraje} km</div>

          <div><span className="font-medium">Tipo General:</span> {vehicle.tipog}</div>
          <div><span className="font-medium">Estado:</span> {vehicle.estado}</div>
          <div><span className="font-medium">Modelo:</span> {vehicle.modelo}</div>
          <div><span className="font-medium">Tipo Específico:</span> {vehicle.tipoe}</div>

          <div><span className="font-medium">Marca:</span> {vehicle.marca}</div>
          <div><span className="font-medium">Chasís:</span> {vehicle.chasis}</div>
          <div><span className="font-medium">Motor:</span> {vehicle.motor}</div>
          <div><span className="font-medium">Cilindrada:</span> {vehicle.cilindrada} cc</div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}


