import React from "react";
import { FaEdit, FaTachometerAlt, FaEye } from "react-icons/fa";

export default function VehicleRow({ vehicle, onEdit, onUpdateKm, onView }) {
  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-4 py-3 border-b border-gray-200 whitespace-nowrap">{vehicle.id}</td>
      <td className="px-4 py-3 border-b border-gray-200 truncate max-w-[160px]">{vehicle.asignacion}</td>
      <td className="px-4 py-3 border-b border-gray-200 whitespace-nowrap">{vehicle.placa}</td>
      <td className="px-4 py-3 border-b border-gray-200 text-center">{vehicle.asientos}</td>
      <td className="px-4 py-3 border-b border-gray-200 whitespace-nowrap">{vehicle.tipo}</td>
      <td className="px-4 py-3 border-b border-gray-200 whitespace-nowrap">{vehicle.kilometraje}</td>
      <td className="px-4 py-3 border-b border-gray-200">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium
            ${
              vehicle.estado === "Óptimo"
                ? "bg-green-100 text-green-700"
                : vehicle.estado === "Mantenimiento"
                ? "bg-yellow-100 text-yellow-700"
                : vehicle.estado === "Desuso"
                ? "bg-gray-200 text-gray-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {vehicle.estado}
        </span>
      </td>
      <td className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-center gap-2">
          {/* Editar */}
          <button
            onClick={onEdit}
            title="Editar"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
          >
            <FaEdit size={14} />
          </button>

          {/* Actualizar Kilometraje */}
          <button
            onClick={onUpdateKm}
            title="Actualizar Kilometraje"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition"
          >
            <FaTachometerAlt size={14} />
          </button>

          {/* Ver detalle */}
          <button
            onClick={onView}
            title="Ver Detalle"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 text-red-900 hover:bg-red-100 transition"
          >
            <FaEye size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}



