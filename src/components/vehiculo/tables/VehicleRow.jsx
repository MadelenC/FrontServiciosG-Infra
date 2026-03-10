import React from "react";
import { FaEdit, FaTachometerAlt, FaEye } from "react-icons/fa";
import Badge from "../../ui/badge/Badge";

export default function VehicleRow({ vehicle, onEdit, onUpdateKm, onView }) {
  const badgeColor =
    vehicle.estado === "Óptimo"
      ? "success"
      : vehicle.estado === "Mantenimiento"
      ? "warning"
      : vehicle.estado === "Desuso"
      ? "gray"
      : "danger";

  return (
    <tr className="border border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="border border-gray-200 px-3 py-2 font-medium text-gray-700">{vehicle.id}</td>
      <td className="border border-gray-200 px-3 py-2 text-gray-700 truncate max-w-[160px]">{vehicle.asignacion}</td>
      <td className="border border-gray-200 px-3 py-2 text-gray-700">{vehicle.placa}</td>
      <td className="border border-gray-200 px-3 py-2 text-center text-gray-700">{vehicle.asientos}</td>
      <td className="border border-gray-200 px-3 py-2 text-gray-700">{vehicle.tipog}</td>
      <td className="border border-gray-200 px-3 py-2 text-gray-700">{vehicle.kilometraje}</td>
      <td className="border border-gray-200 px-3 py-2">
        <Badge size="sm" color={badgeColor} className="px-2 py-1 text-xs">
          {vehicle.estado}
        </Badge>
      </td>
      <td className="border border-gray-200 px-3 py-2">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={onEdit}
            title="Editar"
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          >
            <FaEdit size={14} />
          </button>
          <button
            onClick={onUpdateKm}
            title="Actualizar Kilometraje"
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
          >
            <FaTachometerAlt size={14} />
          </button>
          <button
            onClick={onView}
            title="Ver Detalle"
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            <FaEye size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}



