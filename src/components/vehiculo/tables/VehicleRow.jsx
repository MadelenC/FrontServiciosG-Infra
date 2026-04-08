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
      <td className="border border-gray-200 px-3 py-2 text-gray-700">{vehicle.id}</td>

      <td className="border border-gray-200 px-3 py-2 text-gray-700 truncate">
        {vehicle.asignacion}
      </td>

      <td className="border border-gray-200 px-3 py-2 text-gray-700 truncate">
        {vehicle.placa}
      </td>

      <td className="border border-gray-200 px-3 py-2 text-center text-gray-700">
        {vehicle.asientos}
      </td>

      <td className="border border-gray-200 px-3 py-2 text-gray-700 truncate">
        {vehicle.tipog}
      </td>

      <td className="border border-gray-200 px-3 py-2 text-gray-700">
        {vehicle.kilometraje}
      </td>

      <td className="border border-gray-200 px-3 py-2">
        <Badge size="sm" color={badgeColor} className="px-2 py-1 text-xs">
          {vehicle.estado}
        </Badge>
      </td>

      <td className="border border-gray-200 px-3 py-2">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={onEdit}
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <FaEdit size={14} />
          </button>

          <button
            onClick={onUpdateKm}
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
          >
            <FaTachometerAlt size={14} />
          </button>

          <button
            onClick={onView}
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
          >
            <FaEye size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}


